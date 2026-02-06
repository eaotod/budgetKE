import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface RouteParams {
  params: Promise<{ token: string; productId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const { token, productId } = resolvedParams;
    const bucketName = "budgetke";

    const supabase = createAdminClient();

    // Fetch order by download token
    const { data: order, error } = await supabase
      .from("orders")
      .select("*")
      .eq("download_token", token)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: "Invalid download link" }, { status: 404 });
    }

    // Check if order is paid
    if (order.payment_status !== "completed") {
      return NextResponse.json({ error: "Payment not confirmed" }, { status: 403 });
    }

    // Check download limit
    const downloadCount = order.download_count || 0;
    const maxDownloads = order.max_downloads || 5;
    
    if (downloadCount >= maxDownloads) {
      return NextResponse.json({ error: "Download limit reached" }, { status: 403 });
    }

    // Verify product is in order
    const items = order.items as Array<{ productId: string; name: string }>;
    const orderedProduct = items.find((item) => item.productId === productId);
    
    if (!orderedProduct) {
      return NextResponse.json({ error: "Product not in this order" }, { status: 403 });
    }

    // Fetch product for file URL
    const { data: product } = await supabase
      .from("products")
      .select("file_url, name")
      .eq("id", productId)
      .single();

    if (!product || !product.file_url) {
      return NextResponse.json({ error: "Product file not found" }, { status: 404 });
    }

    // Log download
    await supabase.from("download_logs").insert({
      order_id: order.id,
      product_id: productId,
      ip_address: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
      user_agent: request.headers.get("user-agent"),
    });

    // Increment download count
    await supabase
      .from("orders")
      .update({ download_count: downloadCount + 1 })
      .eq("id", order.id);

    const fileUrl = product.file_url;

    // If file is in Supabase Storage via public URL, generate signed URL
    if (fileUrl.includes("supabase.co/storage")) {
      // Extract bucket and path from URL
      const urlParts = fileUrl.split("/storage/v1/object/public/");
      if (urlParts.length === 2) {
        const [bucket, ...pathParts] = urlParts[1].split("/");
        const filePath = pathParts.join("/");

        const { data: signedUrl } = await supabase.storage
          .from(bucket)
          .createSignedUrl(filePath, 60 * 5); // 5 minutes

        if (signedUrl) {
          return NextResponse.redirect(signedUrl.signedUrl);
        }
      }
    }

    // If we stored a raw storage path, sign it directly
    if (!fileUrl.startsWith("http")) {
      const { data: signedUrl } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(fileUrl, 60 * 5);

      if (signedUrl) {
        return NextResponse.redirect(signedUrl.signedUrl);
      }
    }

    // For external URLs, redirect directly
    return NextResponse.redirect(fileUrl);
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

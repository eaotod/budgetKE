import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getProductBySlugOrId } from "@/lib/catalog";

type OrderItem = {
  productId?: string;
  type?: "product" | "bundle";
};

type OrderRow = {
  id: string;
  items?: OrderItem[];
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, authorLocation, rating, title, content } = body;

    // Validate required fields
    if (!productId || !rating || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Must be logged in to submit a review (Google auth, etc.)
    const supabaseAuth = await createClient();
    const {
      data: { user },
    } = await supabaseAuth.auth.getUser();

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminSupabase = createAdminClient();

    // Check if user has purchased this product (for verified badge)
    const { data: orders } = await adminSupabase
      .from("orders")
      .select("id, items")
      .eq("email", user.email.toLowerCase())
      .eq("payment_status", "completed");

    // Order items store product slug (catalog); productId in review may be id or slug
    const product = getProductBySlugOrId(productId);
    const productSlug = product?.slug;
    const orderRows: OrderRow[] = Array.isArray(orders) ? (orders as OrderRow[]) : [];
    const hasDirectPurchase = orderRows.some((order) =>
      (order.items || []).some(
        (item) =>
          item.type === "product" &&
          (item.productId === productId || item.productId === productSlug),
      ),
    );

    let hasVerifiedPurchase = Boolean(hasDirectPurchase);

    if (!hasVerifiedPurchase && productSlug) {
      const { getBundleBySlug, getBundleById } = await import("@/lib/catalog");
      for (const order of orderRows) {
        for (const item of order.items || []) {
          if (item.type !== "bundle" || !item.productId) continue;
          const bundle = getBundleById(item.productId) ?? getBundleBySlug(item.productId);
          if (bundle?.productIds?.includes(productSlug)) {
            hasVerifiedPurchase = true;
            break;
          }
        }
        if (hasVerifiedPurchase) break;
      }
    }

    // Only buyers can submit reviews
    if (!hasVerifiedPurchase) {
      return NextResponse.json(
        { error: "Only verified buyers can leave a review." },
        { status: 403 },
      );
    }

    const authorName =
      (user.user_metadata?.full_name as string | undefined) ||
      (user.user_metadata?.name as string | undefined) ||
      user.email.split("@")[0];

    // Create the review
    const { data: review, error } = await adminSupabase
      .from("reviews")
      .insert({
        product_id: productId,
        author_name: authorName,
        author_email: user.email.toLowerCase(),
        author_location: authorLocation,
        rating,
        title,
        content,
        is_verified: hasVerifiedPurchase,
        is_approved: false, // Legacy flag (kept for compatibility)
        moderation_status: "pending",
        is_featured: false,
        helpful_count: 0,
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to submit review" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      reviewId: review.id,
      isVerified: hasVerifiedPurchase,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get reviews for a product
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const offset = (page - 1) * limit;

    // Get accepted reviews only
    const { data: reviews, error, count } = await supabase
      .from("reviews")
      .select("*", { count: "exact" })
      .eq("product_id", productId)
      .eq("moderation_status", "accepted")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch reviews" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      reviews: reviews || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

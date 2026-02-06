import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, authorName, authorEmail, authorLocation, rating, title, content } = body;

    // Validate required fields
    if (!productId || !authorName || !authorEmail || !rating || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Check if user has purchased this product (for verified badge)
    const { data: orders } = await supabase
      .from("orders")
      .select("id, items")
      .eq("email", authorEmail.toLowerCase())
      .eq("payment_status", "completed");

    // Check if any order contains this product
    const hasVerifiedPurchase = orders?.some((order: any) =>
      order.items?.some((item: { productId: string }) => item.productId === productId)
    );

    // Create the review
    const { data: review, error } = await supabase
      .from("reviews")
      .insert({
        product_id: productId,
        author_name: authorName,
        author_email: authorEmail.toLowerCase(),
        author_location: authorLocation,
        rating,
        title,
        content,
        is_verified: hasVerifiedPurchase,
        is_approved: false, // Requires moderation
        is_featured: false,
        helpful_count: 0,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Review creation error:", error);
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
  } catch (error) {
    console.error("Reviews API error:", error);
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

    // Get approved reviews only
    const { data: reviews, error, count } = await supabase
      .from("reviews")
      .select("*", { count: "exact" })
      .eq("product_id", productId)
      .eq("is_approved", true)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Reviews fetch error:", error);
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
  } catch (error) {
    console.error("Reviews API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

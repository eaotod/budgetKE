import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const supabase = await createClient();

    // Increment helpful count
    const { error } = await supabase.rpc("increment_review_helpful", {
      review_id: id,
    });

    if (error) {
      // Fallback if RPC doesn't exist - manual update
      const { data: review } = await supabase
        .from("reviews")
        .select("helpful_count")
        .eq("id", id)
        .single();

      if (review) {
        await supabase
          .from("reviews")
          .update({ helpful_count: (review.helpful_count || 0) + 1 })
          .eq("id", id);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Helpful API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

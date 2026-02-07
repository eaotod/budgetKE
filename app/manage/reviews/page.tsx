import { createClient } from "@/lib/supabase/server";
import { ReviewsTable } from "@/components/manage/reviews-table";

export default async function ReviewsManagePage() {
  const supabase = await createClient();

  const { data: reviews = [], error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    return (
      <div className="p-8 bg-red-50 border border-red-100 rounded-2xl text-sm font-medium text-red-700">
        Failed to load reviews. Please try again.
      </div>
    );
  }

  const formatted = (reviews || []).map((r) => ({
    id: r.id,
    product_id: r.product_id,
    author_name: r.author_name,
    author_email: r.author_email,
    rating: r.rating,
    title: r.title,
    content: r.content,
    is_verified: r.is_verified ?? false,
    moderation_status: r.moderation_status ?? (r.is_approved ? "accepted" : "pending"),
    helpful_count: r.helpful_count ?? 0,
    created_at: r.created_at,
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Reviews
          </h1>
          <p className="text-gray-500">
            Moderate customer reviews before they appear publicly.
          </p>
        </div>
      </div>

      <ReviewsTable reviews={formatted} />
    </div>
  );
}


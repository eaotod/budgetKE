"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Comment01Icon,
  ArrowDown01Icon,
  Add01Icon,
  StarIcon,
  CheckmarkBadge01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
// import { ReviewCard } from "@/components/reviews/review-card";
import { ReviewForm } from "@/components/reviews/review-form";
import type { Review, Product } from "@/lib/types";

interface ReviewsSectionProps {
  product: Product;
  reviews: Review[];
  totalReviews?: number;
}

const REVIEWS_PER_PAGE = 5;

export function ReviewsSection({
  product,
  reviews,
  totalReviews,
}: ReviewsSectionProps) {
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE);
  const [showForm, setShowForm] = useState(false);

  const displayedReviews = reviews.slice(0, visibleCount);
  const hasMore = reviews.length > visibleCount;
  const total = totalReviews ?? reviews.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + REVIEWS_PER_PAGE);
  };

  const handleReviewClick = () => {
    setShowForm(!showForm);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleReviewSubmit = async (data: any) => {
    const payload = {
      ...data,
    };

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        return { success: true };
      }
      await res.json().catch(() => null);
      return { success: false, error: "Failed to submit review" };
    } catch {
      return { success: false, error: "Network error" };
    }
  };

  return (
    <section id="reviews" className="py-8 lg:py-16 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 bg-gray-50/50 p-6 md:p-10 rounded-[2rem] border border-gray-100/50">
          <div className="text-center md:text-left">
            {total > 0 ? (
              <>
                <div className="flex items-center justify-center md:justify-start gap-3 text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-2">
                  <span>{product.rating.toFixed(1)}</span>
                  <HugeiconsIcon
                    icon={StarIcon}
                    size={32}
                    className="fill-amber-400 text-amber-400"
                  />
                  <span className="text-gray-400 text-2xl font-bold">
                    ({total.toLocaleString()})
                  </span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-sm font-black text-green-600 uppercase tracking-widest flex items-center gap-1.5">
                    <HugeiconsIcon
                      icon={CheckmarkBadge01Icon}
                      size={14}
                      className="fill-green-600 text-white"
                    />
                    100% Verified Buyers
                  </span>
                </div>
              </>
            ) : (
              <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
                Customer Reviews
              </h3>
            )}
          </div>

          <Button
            onClick={handleReviewClick}
            className="rounded-full h-14 px-8 font-black text-sm bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 uppercase tracking-widest"
          >
            <HugeiconsIcon icon={Add01Icon} size={18} className="mr-2" />
            Write a Review
          </Button>
        </div>

        {/* Review form */}
        {showForm && (
          <div className="mb-16 p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
            <h3 className="text-xl font-black text-gray-900 mb-6 tracking-tight">
              How was your experience?
            </h3>
            <ReviewForm
              productId={product.id}
              onSubmit={handleReviewSubmit}
              onSuccess={() => setShowForm(false)}
              // Assuming ReviewForm can accept a prop to hide Title,
              // if not we might need to modify ReviewForm or just accept standard for now.
              // For now, let's wrap it structurally.
            />
          </div>
        )}

        {/* Reviews list */}
        {displayedReviews.length > 0 ? (
          <div className="space-y-8">
            {displayedReviews.map((review) => (
              <div
                key={review.id}
                className="pb-8 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                      <HugeiconsIcon icon={UserIcon} size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        {review.authorName}
                        {review.isVerified && (
                          <HugeiconsIcon
                            icon={CheckmarkBadge01Icon}
                            size={14}
                            className="text-green-500 fill-green-100"
                          />
                        )}
                      </div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        {review.isVerified ? "Verified Purchase" : "Customer"}
                      </div>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <HugeiconsIcon
                        key={i}
                        icon={StarIcon}
                        size={16}
                        className={
                          i < review.rating ? "fill-amber-400" : "text-gray-200"
                        }
                      />
                    ))}
                  </div>
                </div>
                {review.title && (
                  <h4 className="font-bold text-gray-900 mb-2">
                    {review.title}
                  </h4>
                )}
                <p className="text-gray-600 leading-relaxed font-medium">
                  {review.content}
                </p>
              </div>
            ))}

            {/* Load more */}
            {hasMore && (
              <div className="text-center pt-8">
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  className="rounded-full h-12 px-8 border-gray-200 text-gray-400 hover:text-primary hover:border-primary transition-all font-bold"
                >
                  <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    size={16}
                    className="mr-2"
                  />
                  Load More Reviews
                </Button>
              </div>
            )}
          </div>
        ) : (
          !showForm && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mx-auto mb-6">
                <HugeiconsIcon icon={Comment01Icon} size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Reviews Yet
              </h3>
              <p className="text-gray-500 mb-6 font-medium">
                Be the first to share your experience.
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { ThumbsUp, CheckCircle, User } from "lucide-react";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import type { Review } from "@/lib/types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface ReviewCardProps {
  review: Review;
  onHelpful?: (reviewId: string) => void;
  className?: string;
}

export function ReviewCard({ review, onHelpful, className }: ReviewCardProps) {
  const [isHelpfulClicked, setIsHelpfulClicked] = useState(false);

  const handleHelpful = () => {
    if (!isHelpfulClicked && onHelpful) {
      onHelpful(review.id);
      setIsHelpfulClicked(true);
    }
  };

  const timeAgo = review.createdAt
    ? formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })
    : "Recently";

  return (
    <div className={cn("bg-white border border-gray-100 rounded-xl p-6", className)}>
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {review.authorAvatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.authorAvatar}
              alt={review.authorName}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-gray-400" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-900">{review.authorName}</span>
            {review.isVerified && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                <CheckCircle className="w-3 h-3" />
                Verified Purchase
              </span>
            )}
          </div>
          {review.authorLocation && (
            <p className="text-sm text-gray-500">{review.authorLocation}</p>
          )}
          <div className="flex items-center gap-3 mt-1">
            <StarRating rating={review.rating} size="sm" />
            <span className="text-sm text-gray-400">{timeAgo}</span>
          </div>
        </div>
      </div>

      {/* Review Title */}
      {review.title && (
        <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
      )}

      {/* Review Content */}
      <p className="text-gray-600 leading-relaxed mb-4">{review.content}</p>

      {/* Admin Response */}
      {review.adminResponse && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4 ml-6 border-l-4 border-primary">
          <p className="text-sm font-semibold text-gray-900 mb-1">Response from BudgetKE</p>
          <p className="text-sm text-gray-600">{review.adminResponse}</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        <button
          onClick={handleHelpful}
          disabled={isHelpfulClicked}
          className={cn(
            "flex items-center gap-1.5 text-sm transition-colors",
            isHelpfulClicked
              ? "text-primary cursor-default"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          <ThumbsUp className={cn("w-4 h-4", isHelpfulClicked && "fill-current")} />
          <span>Helpful ({review.helpfulCount + (isHelpfulClicked ? 1 : 0)})</span>
        </button>
      </div>
    </div>
  );
}

// Summary card showing rating distribution
interface ReviewSummaryProps {
  rating: number;
  reviewCount: number;
  distribution?: { stars: number; count: number }[];
}

export function ReviewSummary({ rating, reviewCount, distribution }: ReviewSummaryProps) {
  // Default distribution if not provided
  const defaultDistribution = [
    { stars: 5, count: Math.round(reviewCount * 0.7) },
    { stars: 4, count: Math.round(reviewCount * 0.2) },
    { stars: 3, count: Math.round(reviewCount * 0.07) },
    { stars: 2, count: Math.round(reviewCount * 0.02) },
    { stars: 1, count: Math.round(reviewCount * 0.01) },
  ];

  const ratingDist = distribution || defaultDistribution;
  const maxCount = Math.max(...ratingDist.map((d) => d.count));

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex items-center gap-6 mb-6">
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900">{rating.toFixed(1)}</div>
          <StarRating rating={rating} size="md" className="justify-center mt-2" />
          <p className="text-sm text-gray-500 mt-1">
            {reviewCount.toLocaleString()} reviews
          </p>
        </div>

        <div className="flex-1 space-y-2">
          {ratingDist.map(({ stars, count }) => (
            <div key={stars} className="flex items-center gap-2">
              <span className="text-sm text-gray-600 w-12">{stars} star</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                  style={{ width: maxCount > 0 ? `${(count / maxCount) * 100}%` : "0%" }}
                />
              </div>
              <span className="text-sm text-gray-500 w-8 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

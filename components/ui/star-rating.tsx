"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const sizeClasses = {
  sm: "w-3.5 h-3.5",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = false,
  reviewCount,
  className,
  interactive = false,
  onRatingChange,
}: StarRatingProps) {
  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {Array.from({ length: maxRating }).map((_, index) => {
          const filled = index < Math.floor(rating);
          const partial = !filled && index < rating;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(index)}
              disabled={!interactive}
              className={cn(
                "relative",
                interactive && "cursor-pointer hover:scale-110 transition-transform",
                !interactive && "cursor-default"
              )}
            >
              {/* Background star (empty) */}
              <Star
                className={cn(
                  sizeClasses[size],
                  "text-gray-200"
                )}
              />

              {/* Filled star overlay */}
              {(filled || partial) && (
                <Star
                  className={cn(
                    sizeClasses[size],
                    "absolute inset-0 text-yellow-400 fill-yellow-400",
                    partial && "clip-path-half"
                  )}
                  style={
                    partial
                      ? {
                          clipPath: `inset(0 ${100 - (rating % 1) * 100}% 0 0)`,
                        }
                      : undefined
                  }
                />
              )}
            </button>
          );
        })}
      </div>

      {showValue && (
        <span className="text-sm font-medium text-gray-700 ml-1">
          {rating.toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className="text-sm text-gray-500 ml-1">
          ({reviewCount.toLocaleString()} {reviewCount === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
}

// Compact version for cards
export function StarRatingCompact({
  rating,
  reviewCount,
  className,
}: {
  rating: number;
  reviewCount?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1 text-sm", className)}>
      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      <span className="font-medium text-gray-700">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span className="text-gray-500">({reviewCount})</span>
      )}
    </div>
  );
}

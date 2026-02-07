"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { HugeiconsIcon } from "@hugeicons/react";
import * as HugeIcons from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { toast } from "sonner";

const reviewFormSchema = z.object({
  productId: z.string().min(1),
  rating: z.number().min(1).max(5),
  content: z.string().min(10, "Review must be at least 10 characters"),
});

type ReviewFormData = z.infer<typeof reviewFormSchema>;

interface ReviewFormProps {
  productId: string;
  onSubmit: (
    data: ReviewFormData,
  ) => Promise<{ success: boolean; error?: string }>;
  onSuccess?: () => void;
}

export function ReviewForm({
  productId,
  onSubmit,
  onSuccess,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      productId,
      rating: 0,
    },
  });

  const handleFormSubmit = async (data: ReviewFormData) => {
    if (rating === 0) {
      toast.error("Please select a rating", {
        description: "You must select a star rating to submit a review.",
      });
      setError("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await onSubmit({ ...data, rating });

      if (result.success) {
        setIsSuccess(true);
        reset();
        setRating(0);
        onSuccess?.();
        toast.success("Review submitted!", {
          description: "Thank you for your feedback. check back soon!",
        });
      } else {
        const errorMessage = result.error || "Failed to submit review";
        setError(errorMessage);
        toast.error("Submission failed", {
          description: errorMessage,
        });
      }
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again later.",
      });
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingLabel = (r: number) => {
    if (r === 5) return "Excellent!";
    if (r === 4) return "Very Good";
    if (r === 3) return "Good";
    if (r === 2) return "Fair";
    if (r === 1) return "Poor";
    return "";
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <HugeiconsIcon
            icon={HugeIcons.CheckmarkCircle02Icon}
            className="w-8 h-8 text-green-600"
          />
        </div>
        <h3 className="text-lg font-semibold text-green-900 mb-2">
          Thank you for your review!
        </h3>
        <p className="text-green-700">
          Your review has been submitted and will appear after verification.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Rating */}
      <Field>
        <div className="text-center bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <FieldLabel className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-6 block">
            Your Rating
          </FieldLabel>
          <div className="flex items-center justify-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 transition-transform hover:scale-110"
              >
                <HugeiconsIcon
                  icon={HugeIcons.StarIcon}
                  size={40}
                  className={cn(
                    "transition-all duration-300",
                    (hoverRating || rating) >= star
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-200",
                  )}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <div className="mt-4 text-sm font-black text-primary uppercase tracking-widest">
              {getRatingLabel(rating)}
            </div>
          )}
        </div>
      </Field>

      {/* Content */}
      <Field data-invalid={!!errors.content}>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <FieldLabel
            htmlFor="content"
            className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 mb-4 block"
          >
            Your Experience
          </FieldLabel>
          <Textarea
            id="content"
            placeholder="What did you like about this template? How did it help you?"
            rows={6}
            {...register("content")}
            className={cn(
              "bg-gray-50 border-gray-100 focus:bg-white focus:ring-primary/20 rounded-[2rem] p-6 text-base font-medium resize-none transition-all",
              errors.content && "border-red-500",
            )}
          />
          <FieldError errors={[errors.content]} />
        </div>
      </Field>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 font-bold text-center">
          {error}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-16 text-sm font-black uppercase tracking-widest rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
      >
        {isSubmitting && (
          <HugeiconsIcon
            icon={HugeIcons.Loading03Icon}
            className="w-5 h-5 mr-3 animate-spin"
          />
        )}
        {isSubmitting ? "Submitting..." : "Post Review"}
      </Button>

      <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-widest">
        Your verified account details will be attached automatically
      </p>
    </form>
  );
}

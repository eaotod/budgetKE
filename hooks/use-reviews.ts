"use client";

import { useQuery } from "@tanstack/react-query";
import { mapReviews } from "@/lib/mappers";
import type { Review } from "@/lib/types";

async function fetchReviews(
  productId: string,
): Promise<{ reviews: Review[]; totalCount: number }> {
  const res = await fetch(
    `/api/reviews?productId=${encodeURIComponent(productId)}&limit=25`,
  );
  if (!res.ok) throw new Error("Failed to fetch reviews");
  const data = await res.json();
  return {
    reviews: mapReviews(data.reviews ?? []),
    totalCount: data.total ?? 0,
  };
}

export function useReviews(productId: string) {
  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => fetchReviews(productId),
    staleTime: 60_000, // 1 min cache
  });
}

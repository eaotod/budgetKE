"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function submitReview(formData: FormData) {
  const supabase = await createClient();

  const product_id = formData.get("product_id") as string;
  const rating = Number(formData.get("rating"));
  const comment = formData.get("comment") as string;
  const user_name = formData.get("name") as string;
  const user_email = formData.get("email") as string; // Optional

  if (!product_id || !rating || !comment || !user_name) {
    return { error: "Missing required fields" };
  }

  const { error } = await supabase.from("reviews").insert({
    product_id,
    rating,
    comment,
    user_name,
    user_email,
  });

  if (error) {
    return { error: "Failed to submit review" };
  }

  revalidatePath(`/templates/${product_id}`);
  return { success: true };
}

export async function getReviews(productId: string) {
  const supabase = await createClient();

  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  return reviews || [];
}

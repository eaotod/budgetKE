"use server";

import { revalidatePath } from "next/cache";
import { assertAdmin } from "@/lib/auth/admin";

export type ReviewModerationStatus = "pending" | "accepted" | "rejected";

export async function setReviewModerationStatus(
  id: string,
  moderation_status: ReviewModerationStatus,
) {
  const { supabase } = await assertAdmin();

  const update: Record<string, unknown> = {
    moderation_status,
    is_approved: moderation_status === "accepted",
  };

  const { error } = await supabase.from("reviews").update(update).eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/manage/reviews");
  return { success: true };
}


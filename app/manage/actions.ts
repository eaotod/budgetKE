"use server";

import { revalidatePath } from "next/cache";
import { assertAdmin } from "@/lib/auth/admin";

export async function deleteItem(
  id: string,
  type: "products" | "categories" | "bundles" | "services",
) {
  const { supabase } = await assertAdmin();

  const { error } = await supabase
    .from(type)
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting ${type}:`, error);
    return { success: false, error: error.message };
  }

  revalidatePath(`/manage/${type}`);
  return { success: true };
}

export async function reorderCategories(order: Array<{ id: string; display_order: number }>) {
  const { supabase } = await assertAdmin();

  const { error } = await supabase
    .from("categories")
    .upsert(order, { onConflict: "id" });

  if (error) {
    console.error("Error reordering categories:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/manage/categories");
  return { success: true };
}

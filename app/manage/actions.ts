"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteItem(id: string, type: "products" | "categories" | "bundles") {
  const supabase = await createClient();

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

"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteOrder(orderId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Verify ownership
  const { data: order } = await supabase
    .from("orders")
    .select("email, payment_status")
    .eq("id", orderId)
    .single();

  if (!order || order.email !== user.email) {
    throw new Error("Order not found or access denied");
  }

  if (order.payment_status === "completed") {
    throw new Error("Cannot delete completed orders");
  }

  const { error } = await supabase.from("orders").delete().eq("id", orderId);

  if (error) {
    throw new Error("Failed to delete order");
  }

  revalidatePath("/account");
  return { success: true };
}

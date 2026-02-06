"use server";

import { createClient } from "@/lib/supabase/server";

export async function subscribeToNewsletter(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;

  if (!email) {
    return { error: "Email is required" };
  }

  // Check if already subscribed
  const { data: existing } = await supabase
    .from("newsletter_subscribers")
    .select("id")
    .eq("email", email.toLowerCase())
    .single();

  if (existing) {
    return { message: "You're already subscribed!" };
  }

  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: email.toLowerCase() });

  if (error) {
    return { error: "Failed to subscribe. Please try again." };
  }

  return { success: true, message: "Thank you for subscribing!" };
}

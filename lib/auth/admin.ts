import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

function parseAdminEmails(raw: string | undefined) {
  if (!raw) return [];
  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function getAdminEmails() {
  const single = process.env.ADMIN_EMAIL;
  const multiple = process.env.ADMIN_EMAILS;
  const emails = [
    ...parseAdminEmails(single),
    ...parseAdminEmails(multiple),
  ];

  return Array.from(new Set(emails));
}

export function isAdminEmail(email?: string | null) {
  if (!email) return false;
  const adminEmails = getAdminEmails();
  return adminEmails.includes(email.toLowerCase());
}

function hasAdminRole(user: { email?: string | null; user_metadata?: any } | null) {
  if (!user) return false;
  const role = user.user_metadata?.role;
  return role === "admin" || isAdminEmail(user.email);
}

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/manage");
  }

  if (!hasAdminRole(user)) {
    redirect("/login?error=not_admin");
  }

  return { supabase, user };
}

export async function assertAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!hasAdminRole(user)) {
    throw new Error("Unauthorized");
  }

  // use service-role client for privileged operations (bypasses RLS)
  const adminSupabase = createAdminClient();
  return { supabase: adminSupabase, user };
}

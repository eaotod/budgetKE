import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

function hasAdminRole(user: { user_metadata?: unknown } | null) {
  if (!user) return false;
  const metadata = (user.user_metadata ?? {}) as Record<string, unknown>;
  return metadata.role === "admin";
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

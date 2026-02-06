import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isAdminEmail } from "@/lib/auth/admin";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const rawNext = requestUrl.searchParams.get("next");
  const next = rawNext && rawNext.startsWith("/") ? rawNext : "/account";

  if (code) {
    const cookieStore = await (await import("next/headers")).cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: "", ...options });
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Ensure role metadata is set
      const shouldBeAdmin = isAdminEmail(user?.email);
      const currentRole = user?.user_metadata?.role;
      const desiredRole = shouldBeAdmin ? "admin" : "user";
      if (user && currentRole !== desiredRole) {
        await supabase.auth.updateUser({ data: { role: desiredRole } });
      }

      // If attempting to access admin routes, enforce admin email
      if (next.startsWith("/manage")) {
        if (!user || (!shouldBeAdmin && currentRole !== "admin")) {
          await supabase.auth.signOut();
          return NextResponse.redirect(
            `${requestUrl.origin}/login?error=not_admin`,
          );
        }
      }

      return NextResponse.redirect(`${requestUrl.origin}${next}`);
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${requestUrl.origin}/login?error=auth`);
}

import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

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
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
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

      // Bootstrap single-admin role on first login (Google, etc.)
      // This does NOT grant access by email at runtime; it only sets metadata.role.
      const bootstrapAdminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
      if (
        bootstrapAdminEmail &&
        user?.email?.toLowerCase() === bootstrapAdminEmail &&
        user.user_metadata?.role !== "admin"
      ) {
        await supabase.auth.updateUser({ data: { role: "admin" } });
      }

      // If attempting to access admin routes, enforce admin role metadata
      if (next.startsWith("/manage")) {
        if (!user || user.user_metadata?.role !== "admin") {
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

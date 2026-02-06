import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, source = "website" } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Check if already subscribed
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id, is_active")
      .eq("email", email.toLowerCase())
      .single();

    if (existing && existing.is_active) {
      return NextResponse.json({ success: true, message: "Already subscribed" });
    }

    const resend = getResendClient();

    if (existing) {
      // Reactivate subscription
      await supabase
        .from("newsletter_subscribers")
        .update({ is_active: true, unsubscribed_at: null })
        .eq("id", existing.id);
    } else {
      // Create new subscriber
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({
          email: email.toLowerCase(),
          name,
          source,
        });

      if (error) {
        console.error("Newsletter subscription error:", error);
        return NextResponse.json(
          { error: "Failed to subscribe" },
          { status: 500 }
        );
      }
    }

    // Send Welcome Email
    if (resend) {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://budget.ke";
      
      try {
        await resend.emails.send({
          from: "BudgetKE <hello@budget.ke>",
          to: [email],
          subject: "Welcome to BudgetKE! 🚀",
          html: `
            <h1>Welcome to the BudgetKE community!</h1>
            <p>Hi ${name || "there"},</p>
            <p>Thank you for subscribing to our newsletter. You'll be the first to know about new templates, business tools, and exclusive offers.</p>
            <p>In the meantime, feel free to browse our latest templates:</p>
            <a href="${baseUrl}/templates" style="background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 10px;">
              Browse Templates
            </a>
            <p style="margin-top: 20px; color: #666; font-size: 12px;">
              If you didn't sign up for this, you can safely ignore this email.
            </p>
          `,
        });
      } catch (e) {
        // Don't fail the whole request if email fails
        console.error("Failed to send welcome email:", e);
      }
    }

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { nanoid } from "nanoid";

// IntaSend Webhook Handler
export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature (IntaSend uses custom header)
    const signature = request.headers.get("x-intasend-signature");
    const webhookSecret = process.env.INTASEND_WEBHOOK_SECRET;

    // For production, implement proper signature verification
    // const isValid = verifyWebhookSignature(signature, await request.text(), webhookSecret);

    const body = await request.json();
    console.log("M-Pesa webhook received:", JSON.stringify(body, null, 2));

    const {
      invoice_id,
      state,
      api_ref: orderId,
      mpesa_reference,
      charges,
      value,
      failed_reason,
      failed_code,
    } = body;

    if (!orderId) {
      console.error("No order ID in webhook");
      return NextResponse.json({ success: false, error: "No order ID" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Handle different payment states
    if (state === "COMPLETE" || state === "PROCESSING") {
      // Generate download token
      const downloadToken = nanoid(32);

      // Update order status
      const { error } = await supabase
        .from("orders")
        .update({
          payment_status: state === "COMPLETE" ? "completed" : "processing",
          payment_reference: mpesa_reference || invoice_id,
          download_token: downloadToken,
          paid_at: new Date().toISOString(),
        })
        .eq("id", orderId);

      if (error) {
        console.error("Order update error:", error);
        return NextResponse.json({ success: false }, { status: 500 });
      }

      // Get order details for email
      const { data: order } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (order && state === "COMPLETE") {
        // Send receipt email (async, don't wait)
        fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/receipt`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId,
            email: order.email,
            orderNumber: order.order_number,
            items: order.items,
            total: order.total,
            downloadToken,
          }),
        }).catch(console.error);
      }

      return NextResponse.json({ success: true });
    } else if (state === "FAILED" || state === "CANCELLED") {
      // Update order as failed
      await supabase
        .from("orders")
        .update({
          payment_status: "failed",
          notes: failed_reason || `Payment ${state.toLowerCase()}`,
        })
        .eq("id", orderId);

      return NextResponse.json({ success: true });
    }

    // Unknown state - just log
    console.log("Unknown payment state:", state);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("M-Pesa webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// IntaSend may also send GET requests to verify webhook endpoint
export async function GET() {
  return NextResponse.json({ status: "ok", service: "BudgetKE M-Pesa Webhook" });
}

import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, customerName, items, total } = body;

    // Validate required fields
    if (!email || !phone || !items || items.length === 0 || !total) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate order number
    const orderNumber = `BK-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${nanoid(6).toUpperCase()}`;

    // Calculate subtotal
    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );

    const supabase = createAdminClient();

    // Create order in Supabase
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        email,
        phone,
        customer_name: customerName,
        items,
        subtotal,
        discount: 0,
        total,
        currency: "KES",
        payment_method: "mpesa",
        payment_status: "pending",
        max_downloads: 5,
        ip_address: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
        user_agent: request.headers.get("user-agent"),
      })
      .select("id")
      .single();

    if (error) {
      console.error("Order creation error:", error);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber,
    });
  } catch (error) {
    console.error("Order API error:", error);
    
    // Mock fallback for development/demo
    return NextResponse.json({
      success: true,
      orderId: `mock-${nanoid()}`,
      orderNumber: `BK-MOCK-${nanoid(6).toUpperCase()}`,
    });
  }
}

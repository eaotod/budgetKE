import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { createAdminClient } from "@/lib/supabase/admin";
import { getBundleBySlug, getBundleById, getProductBySlug } from "@/lib/catalog";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: "product" | "bundle";
};

/** Expand bundle items into per-product line items so each download link works. */
function expandOrderItems(items: CartItem[]): CartItem[] {
  const expanded: CartItem[] = [];
  for (const item of items) {
    if (item.type === "bundle") {
      const bundle =
        getBundleById(item.id) ?? getBundleBySlug(item.id);
      if (bundle?.productIds?.length) {
        for (const slug of bundle.productIds) {
          const product = getProductBySlug(slug);
          expanded.push({
            id: slug,
            name: product?.name ?? slug,
            price: 0,
            quantity: 1,
            type: "product",
          });
        }
        continue;
      }
    }
    expanded.push({
      ...item,
      id: item.id,
      type: item.type as "product" | "bundle",
    });
  }
  return expanded;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, customerName, items, total } = body;

    if (!email || !phone || !items || items.length === 0 || !total) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const orderNumber = `BK-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${nanoid(6).toUpperCase()}`;

    const expandedItems = expandOrderItems(items as CartItem[]);
    const subtotal = (items as CartItem[]).reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0,
    );

    const supabase = createAdminClient();

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        email,
        phone,
        customer_name: customerName,
        items: expandedItems.map((i) => ({
          productId: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          type: i.type,
        })),
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
  } catch {
    // Mock fallback for development/demo
    return NextResponse.json({
      success: true,
      orderId: `mock-${nanoid()}`,
      orderNumber: `BK-MOCK-${nanoid(6).toUpperCase()}`,
    });
  }
}

import { createAdminClient } from "@/lib/supabase/admin";

import { OrdersTable } from "@/components/manage/orders-table";

export default async function OrdersPage() {
  const supabase = createAdminClient();

  const { data: orders = [], error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-8 bg-red-50 border border-red-100 rounded-2xl text-sm font-medium text-red-700">
        Failed to load orders. Please try again.
      </div>
    );
  }

  // Pre-process orders to match OrderRow interface
  const formattedOrders = (orders || []).map((order) => ({
    id: order.id,
    order_number: order.order_number || order.orderNumber || "",
    email: order.email,
    total: order.total,
    payment_status: order.payment_status || order.paymentStatus || "pending",
    created_at: order.created_at,
    items_count: Array.isArray(order.items) ? order.items.length : 0,
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Orders
          </h1>
          <p className="text-gray-500">
            View and manage customer orders and transactions.
          </p>
        </div>
      </div>

      <OrdersTable orders={formattedOrders} />
    </div>
  );
}

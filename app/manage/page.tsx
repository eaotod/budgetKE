import {
  Clock01Icon,
  Wallet01Icon,
  ShoppingBag01Icon,
  UserGroupIcon,
  TrendingUp,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

function calcTrend(current: number, previous: number) {
  if (previous === 0 && current === 0) return { value: "0%", positive: true };
  if (previous === 0) return { value: "+100%", positive: true };
  const delta = ((current - previous) / previous) * 100;
  const rounded = Math.round(delta * 10) / 10;
  return {
    value: `${rounded >= 0 ? "+" : ""}${rounded}%`,
    positive: rounded >= 0,
  };
}

export default async function ManagePage() {
  const supabase = await createClient();
  const now = new Date();
  const currentStart = new Date(now);
  currentStart.setDate(currentStart.getDate() - 30);
  const previousStart = new Date(now);
  previousStart.setDate(previousStart.getDate() - 60);

  const { data: recentOrders = [] } = await supabase
    .from("orders")
    .select("id, order_number, email, total, payment_status, created_at")
    .order("created_at", { ascending: false })
    .limit(8);

  const { data: recentWindow = [] } = await supabase
    .from("orders")
    .select("email, total, payment_status, created_at")
    .gte("created_at", previousStart.toISOString());

  const inCurrent = recentWindow.filter(
    (o) => new Date(o.created_at) >= currentStart,
  );
  const inPrevious = recentWindow.filter(
    (o) =>
      new Date(o.created_at) >= previousStart &&
      new Date(o.created_at) < currentStart,
  );

  const currentRevenue = inCurrent
    .filter((o) => o.payment_status === "completed")
    .reduce((sum, o) => sum + (o.total || 0), 0);
  const previousRevenue = inPrevious
    .filter((o) => o.payment_status === "completed")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const currentOrders = inCurrent.length;
  const previousOrders = inPrevious.length;

  const currentCustomers = new Set(
    inCurrent.map((o) => o.email).filter(Boolean),
  ).size;
  const previousCustomers = new Set(
    inPrevious.map((o) => o.email).filter(Boolean),
  ).size;

  const revenueTrend = calcTrend(currentRevenue, previousRevenue);
  const ordersTrend = calcTrend(currentOrders, previousOrders);
  const customersTrend = calcTrend(currentCustomers, previousCustomers);

  const stats = [
    {
      label: "Revenue (30d)",
      value: `KES ${currentRevenue.toLocaleString()}`,
      icon: Wallet01Icon,
      trend: revenueTrend.value,
      positive: revenueTrend.positive,
    },
    {
      label: "Orders (30d)",
      value: `${currentOrders}`,
      icon: ShoppingBag01Icon,
      trend: ordersTrend.value,
      positive: ordersTrend.positive,
    },
    {
      label: "Customers (30d)",
      value: `${currentCustomers}`,
      icon: UserGroupIcon,
      trend: customersTrend.value,
      positive: customersTrend.positive,
    },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Welcome back! Here's an overview of your business performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/30 group hover:border-primary/20 transition-all duration-500 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/5 transition-all duration-500 overflow-hidden relative">
                <HugeiconsIcon
                  icon={stat.icon}
                  className="w-7 h-7 relative z-10"
                />
                <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </div>
              <div
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-500",
                  stat.positive
                    ? "text-green-600 bg-green-50 group-hover:bg-green-100"
                    : "text-red-600 bg-red-50",
                )}
              >
                <HugeiconsIcon icon={TrendingUp} className="w-3.5 h-3.5" />
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
                {stat.label}
              </p>
              <h3 className="text-3xl font-black text-gray-900 tracking-tight">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">
              Recent Orders
            </h2>
            <p className="text-sm text-gray-400 mt-1 font-medium">
              Monitor your latest transactions and order status.
            </p>
          </div>
          <button className="px-6 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-full text-xs font-black uppercase tracking-widest transition-all">
            View all activity
          </button>
        </div>
        <div className="p-10">
          {recentOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-200">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                <HugeiconsIcon
                  icon={Clock01Icon}
                  className="w-8 h-8 text-gray-200 animate-pulse"
                />
              </div>
              <p className="text-gray-400 font-bold tracking-tight">
                No recent orders yet
              </p>
              <p className="text-xs text-gray-300 mt-2">
                When customers start buying, they'll appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl border border-gray-100 bg-white"
                >
                  <div>
                    <div className="text-xs font-black text-gray-400 uppercase tracking-widest">
                      {order.order_number}
                    </div>
                    <div className="font-bold text-gray-900 mt-1">
                      {order.email}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {format(new Date(order.created_at), "MMM d, yyyy")}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-black text-gray-900">
                      KES {order.total.toLocaleString()}
                    </div>
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                        order.payment_status === "completed"
                          ? "bg-green-50 text-green-700"
                          : order.payment_status === "failed"
                            ? "bg-red-50 text-red-700"
                            : "bg-gray-100 text-gray-600",
                      )}
                    >
                      {order.payment_status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

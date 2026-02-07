"use client";

import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FilterIcon,
  Search01Icon,
  ShoppingBag01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface OrderRow {
  id: string;
  order_number: string;
  email: string;
  total: number;
  payment_status: string;
  created_at: string;
  items_count?: number;
}

const ITEMS_PER_PAGE = 12;

export function OrdersTable({ orders }: { orders: OrderRow[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 250);

  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    return orders.filter((order) => {
      if (status !== "all" && order.payment_status !== status) return false;
      if (!q) return true;
      return (
        order.email.toLowerCase().includes(q) ||
        order.order_number.toLowerCase().includes(q)
      );
    });
  }, [orders, debouncedSearch, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const pageItems = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );
  const start = filtered.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(page * ITEMS_PER_PAGE, filtered.length);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Pagination logic to show limited pages if too many
  const visiblePages = useMemo(() => {
    if (totalPages <= 7) return pages;
    if (page <= 4) return [...pages.slice(0, 5), "...", totalPages];
    if (page >= totalPages - 3)
      return [1, "...", ...pages.slice(totalPages - 5)];
    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  }, [page, totalPages, pages]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [debouncedSearch, status]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages); // eslint-disable-line react-hooks/set-state-in-effect
  }, [page, totalPages]);

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gray-50/30 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <HugeiconsIcon
            icon={Search01Icon}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email or order #..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <HugeiconsIcon
              icon={FilterIcon}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="pl-9 pr-8 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-600 focus:outline-none appearance-none cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="px-4 py-3 text-xs font-bold text-gray-500 flex items-center bg-white border border-gray-200 rounded-2xl">
            {filtered.length} results
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
              <th className="px-6 py-5">Order #</th>
              <th className="px-6 py-5">Customer</th>
              <th className="px-6 py-5">Date</th>
              <th className="px-6 py-5">Items</th>
              <th className="px-6 py-5">Total</th>
              <th className="px-6 py-5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pageItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                      <HugeiconsIcon
                        icon={ShoppingBag01Icon}
                        className="w-6 h-6 text-gray-300"
                      />
                    </div>
                    <p className="text-gray-500 font-medium">No orders found</p>
                  </div>
                </td>
              </tr>
            ) : (
              pageItems.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50/30 transition-colors group"
                >
                  <td className="px-6 py-5">
                    <div className="font-bold text-gray-900">
                      {order.order_number}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                      {order.id.slice(0, 8)}...
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <HugeiconsIcon icon={UserIcon} className="w-3 h-3" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {order.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-gray-500">
                    {format(new Date(order.created_at), "MMM d, yyyy")}
                    <div className="text-[10px] text-gray-400">
                      {format(new Date(order.created_at), "h:mm a")}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded-lg">
                      {order.items_count || 1} items
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-black text-gray-900">
                    KES {order.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                        order.payment_status === "completed"
                          ? "bg-green-50 text-green-700"
                          : order.payment_status === "failed"
                            ? "bg-red-50 text-red-700"
                            : "bg-gray-100 text-gray-600",
                      )}
                    >
                      {order.payment_status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-6 border-t border-gray-100 flex items-center justify-between">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Showing {start}-{end} of {filtered.length}
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {visiblePages.map((p, idx) => (
              <button
                key={`${p}-${idx}`}
                onClick={() => typeof p === "number" && setPage(p)}
                disabled={typeof p !== "number"}
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all",
                  p === page
                    ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20 scale-105"
                    : "bg-white text-gray-500 border border-gray-200",
                  typeof p !== "number"
                    ? "border-none cursor-default"
                    : "hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

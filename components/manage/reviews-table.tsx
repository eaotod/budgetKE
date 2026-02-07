"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useDebounce } from "use-debounce";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  CheckmarkCircle02Icon,
  Cancel01Icon,
  FilterIcon,
  Search01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";
import { setReviewModerationStatus } from "@/app/manage/reviews/actions";

type ModerationStatus = "pending" | "accepted" | "rejected";

interface ReviewRow {
  id: string;
  product_id: string;
  author_name: string;
  author_email: string;
  rating: number;
  title?: string | null;
  content: string;
  is_verified: boolean;
  moderation_status: ModerationStatus;
  helpful_count: number;
  created_at: string;
}

const ITEMS_PER_PAGE = 12;

export function ReviewsTable({ reviews }: { reviews: ReviewRow[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | ModerationStatus>("all");
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 250);
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    return reviews.filter((r) => {
      if (status !== "all" && r.moderation_status !== status) return false;
      if (!q) return true;
      return (
        r.author_email.toLowerCase().includes(q) ||
        r.author_name.toLowerCase().includes(q) ||
        r.product_id.toLowerCase().includes(q) ||
        (r.title || "").toLowerCase().includes(q) ||
        r.content.toLowerCase().includes(q)
      );
    });
  }, [reviews, debouncedSearch, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const pageItems = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );
  const start = filtered.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(page * ITEMS_PER_PAGE, filtered.length);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [debouncedSearch, status]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages); // eslint-disable-line react-hooks/set-state-in-effect
  }, [page, totalPages]);

  const updateStatus = (id: string, next: ModerationStatus) => {
    startTransition(async () => {
      const res = await setReviewModerationStatus(id, next);
      if (res.success) toast.success(`Review marked ${next}`);
      else toast.error(res.error || "Failed to update review");
    });
  };

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
            placeholder="Search reviews (email, product, content)..."
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
              onChange={(e) =>
                setStatus(e.target.value as "all" | ModerationStatus)
              }
              className="pl-9 pr-8 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-600 focus:outline-none appearance-none cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
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
              <th className="px-6 py-5">Customer</th>
              <th className="px-6 py-5">Product</th>
              <th className="px-6 py-5">Rating</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5">Date</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pageItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <p className="text-gray-500 font-medium">No reviews found</p>
                </td>
              </tr>
            ) : (
              pageItems.map((r) => (
                <tr
                  key={r.id}
                  className="hover:bg-gray-50/30 transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className="font-bold text-gray-900">
                      {r.author_name}
                    </div>
                    <div className="text-[10px] font-medium text-gray-400 mt-0.5 uppercase tracking-wider">
                      {r.author_email}
                      {r.is_verified ? " • verified" : ""}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-bold text-gray-900">
                      {r.product_id}
                    </div>
                    <div className="text-xs text-gray-500 line-clamp-1">
                      {r.title || r.content}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <HugeiconsIcon
                          key={i}
                          icon={StarIcon}
                          className={cn(
                            "w-4 h-4",
                            i < r.rating ? "fill-amber-400" : "text-gray-200",
                          )}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                        r.moderation_status === "accepted"
                          ? "bg-green-50 text-green-700"
                          : r.moderation_status === "rejected"
                            ? "bg-red-50 text-red-700"
                            : "bg-gray-100 text-gray-600",
                      )}
                    >
                      {r.moderation_status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-gray-500">
                    {format(new Date(r.created_at), "MMM d, yyyy")}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => updateStatus(r.id, "accepted")}
                        className="p-2 rounded-xl bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                        title="Accept"
                      >
                        <HugeiconsIcon
                          icon={CheckmarkCircle02Icon}
                          className="w-4 h-4"
                        />
                      </button>
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => updateStatus(r.id, "rejected")}
                        className="p-2 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                        title="Reject"
                      >
                        <HugeiconsIcon
                          icon={Cancel01Icon}
                          className="w-4 h-4"
                        />
                      </button>
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => updateStatus(r.id, "pending")}
                        className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        title="Mark Pending"
                      >
                        <HugeiconsIcon icon={FilterIcon} className="w-4 h-4" />
                      </button>
                    </div>
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all",
                  p === page
                    ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20 scale-105"
                    : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-gray-200",
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

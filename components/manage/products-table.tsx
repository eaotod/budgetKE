"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useDebounce } from "use-debounce";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Edit02Icon,
  FilterIcon,
  LinkSquare01Icon,
  MoreVerticalIcon,
  PackageIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteAction } from "@/components/manage/delete-action";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface CategoryOption {
  id: string;
  name: string;
}

interface ProductRow {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  price: number;
  status: string;
  download_count?: number | null;
  created_at: string;
  thumbnail_url?: string | null;
  categories?: { name?: string | null } | null;
}

const ITEMS_PER_PAGE = 12;

export function ProductsTable({
  products,
  categories,
}: {
  products: ProductRow[];
  categories: CategoryOption[];
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 250);

  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    return products.filter((product) => {
      if (status !== "all" && product.status !== status) return false;
      if (category !== "all" && product.category_id !== category) return false;
      if (!q) return true;
      return (
        product.name.toLowerCase().includes(q) ||
        product.slug.toLowerCase().includes(q)
      );
    });
  }, [products, debouncedSearch, status, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const pageItems = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );
  const start = filtered.length === 0 ? 0 : (page - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(page * ITEMS_PER_PAGE, filtered.length);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status, category]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
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
            placeholder="Search products..."
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
              className="pl-9 pr-8 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-600 focus:outline-none appearance-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-600 focus:outline-none appearance-none"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <div className="px-4 py-3 text-xs font-bold text-gray-500 flex items-center">
            {filtered.length} results
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
              <th className="px-6 py-5">Product</th>
              <th className="px-6 py-5">Category</th>
              <th className="px-6 py-5">Price</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5">Sales</th>
              <th className="px-6 py-5">Created</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pageItems.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50/30 transition-colors group"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                      {product.thumbnail_url ? (
                        <img
                          src={product.thumbnail_url}
                          alt=""
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <HugeiconsIcon
                            icon={PackageIcon}
                            className="w-6 h-6"
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 line-clamp-1 leading-tight">
                        {product.name}
                      </div>
                      <div className="text-[10px] font-medium text-gray-400 mt-0.5 uppercase tracking-wider">
                        {product.slug}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-xs font-bold text-gray-500 py-1 px-2 border border-gray-100 rounded-lg">
                    {product.categories?.name || "Uncategorized"}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm font-black text-gray-900">
                  KES {product.price.toLocaleString()}
                </td>
                <td className="px-6 py-5">
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                      product.status === "active"
                        ? "bg-primary/10 text-primary"
                        : "bg-gray-100 text-gray-500",
                    )}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <span className="text-xs font-black text-gray-900">
                    {product.download_count || 0}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm font-medium text-gray-500">
                  {format(new Date(product.created_at), "MMM d, yyyy")}
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-1 px-1">
                    <Link
                      href={`/templates/${product.slug}`}
                      target="_blank"
                      className="p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                      title="View Public Page"
                    >
                      <HugeiconsIcon icon={LinkSquare01Icon} className="w-4 h-4" />
                    </Link>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100">
                          <HugeiconsIcon icon={MoreVerticalIcon} className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 rounded-xl">
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/manage/products/edit/${product.id}`}
                            className="flex items-center gap-2 cursor-pointer font-medium p-2"
                          >
                            <HugeiconsIcon icon={Edit02Icon} className="w-4 h-4 text-gray-500" />
                            Edit Product
                          </Link>
                        </DropdownMenuItem>
                        <DeleteAction
                          id={product.id}
                          type="products"
                          name={product.name}
                        />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-6 border-t border-gray-100 flex items-center justify-between">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            Showing {start}-{end} of {filtered.length}
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {pages.map((p) => (
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

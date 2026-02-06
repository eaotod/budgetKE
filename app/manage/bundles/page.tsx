import Link from "next/link";
import {
  Plus,
  Search,
  MoreVertical,
  Package,
  ExternalLink,
  Edit,
  Trash2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteAction } from "@/components/manage/delete-action";

export default async function BundlesPage() {
  const supabase = await createClient();

  const { data: bundles, error } = await supabase
    .from("bundles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching bundles:", error);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Bundles
          </h1>
          <p className="text-gray-500">
            Create product packages with discounted pricing.
          </p>
        </div>
        <Link
          href="/manage/bundles/new"
          className="bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all shadow-xl shadow-gray-200/50"
        >
          <Plus className="w-5 h-5" />
          Create Bundle
        </Link>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/30 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search bundles..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                <th className="px-6 py-5">Bundle</th>
                <th className="px-6 py-5 text-center">Products</th>
                <th className="px-6 py-5">Price</th>
                <th className="px-6 py-5">Savings</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bundles?.map((bundle) => (
                <tr
                  key={bundle.id}
                  className="hover:bg-gray-50/30 transition-colors group"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center text-gray-400 border border-gray-100">
                        {bundle.thumbnail_url ? (
                          <img
                            src={bundle.thumbnail_url}
                            alt=""
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          />
                        ) : (
                          <Package className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 line-clamp-1 leading-tight">
                          {bundle.name}
                        </div>
                        <div className="text-[10px] font-medium text-gray-400 mt-0.5 uppercase tracking-wider">
                          {bundle.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                      {bundle.product_ids?.length || 0} Products
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-black text-gray-900">
                      KES {bundle.bundle_price.toLocaleString()}
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 line-through">
                      KES {bundle.original_price?.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-black text-primary">
                      KES {bundle.savings?.toLocaleString()} OFF
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                        bundle.status === "active"
                          ? "bg-primary/10 text-primary"
                          : "bg-gray-100 text-gray-500",
                      )}
                    >
                      {bundle.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-1 px-1">
                      <Link
                        href={`/bundles/${bundle.slug}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-40 rounded-xl"
                        >
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/manage/bundles/edit/${bundle.id}`}
                              className="flex items-center gap-2 cursor-pointer font-medium p-2"
                            >
                              <Edit className="w-4 h-4 text-gray-500" />
                              Edit Bundle
                            </Link>
                          </DropdownMenuItem>
                          <DeleteAction
                            id={bundle.id}
                            type="bundles"
                            name={bundle.name}
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
      </div>
    </div>
  );
}

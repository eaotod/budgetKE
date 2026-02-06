import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  ExternalLink,
  Edit,
  Trash2,
} from "lucide-react";
import { PackageIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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

export default async function ProductsPage() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("*, categories(name)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Products
          </h1>
          <p className="text-gray-500">
            Manage your template catalog and digital files.
          </p>
        </div>
        <Link
          href="/manage/products/new"
          className="bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all shadow-xl shadow-gray-200/50"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/30 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-5 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
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
              {products?.map((product) => (
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
                              href={`/manage/products/edit/${product.id}`}
                              className="flex items-center gap-2 cursor-pointer font-medium p-2"
                            >
                              <Edit className="w-4 h-4 text-gray-500" />
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
      </div>
    </div>
  );
}

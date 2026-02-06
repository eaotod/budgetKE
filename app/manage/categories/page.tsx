import Link from "next/link";
import {
  Plus,
  Search,
  Folder,
  ExternalLink,
  MoreVertical,
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

export default async function CategoriesPage() {
  const supabase = await createClient();

  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Categories
          </h1>
          <p className="text-gray-500">
            Organize your products into logical groups.
          </p>
        </div>
        <Link
          href="/manage/categories/new"
          className="bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all shadow-xl shadow-gray-200/50"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </Link>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/30 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                <th className="px-6 py-5">Name</th>
                <th className="px-6 py-5">Slug</th>
                <th className="px-6 py-5 text-center">Order</th>
                <th className="px-6 py-5 text-center">Products</th>
                <th className="px-6 py-5">Created</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories?.map((category) => (
                <tr
                  key={category.id}
                  className="hover:bg-gray-50/30 transition-colors group"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Folder className="w-5 h-5 font-bold" />
                      </div>
                      <div className="font-bold text-gray-900">
                        {category.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-gray-500">
                    {category.slug}
                  </td>
                  <td className="px-6 py-5 text-sm text-center font-black text-gray-900">
                    {category.display_order}
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-black uppercase tracking-wider">
                      {category.product_count || 0} Products
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-gray-500">
                    {format(new Date(category.created_at), "MMM d, yyyy")}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/templates?category=${category.slug}`}
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
                              href={`/manage/categories/edit/${category.id}`}
                              className="flex items-center gap-2 cursor-pointer font-medium p-2"
                            >
                              <Edit className="w-4 h-4 text-gray-500" />
                              Edit Category
                            </Link>
                          </DropdownMenuItem>
                          <DeleteAction
                            id={category.id}
                            type="categories"
                            name={category.name}
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

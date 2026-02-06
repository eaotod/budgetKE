import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { createClient } from "@/lib/supabase/server";
import { CategoriesTable } from "@/components/manage/categories-table";

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
          <HugeiconsIcon icon={Add01Icon} className="w-5 h-5" />
          Add Category
        </Link>
      </div>

      <CategoriesTable categories={categories ?? []} />
    </div>
  );
}

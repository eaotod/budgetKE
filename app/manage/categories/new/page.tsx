import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CategoryForm } from "@/components/manage/category-form";

export default function NewCategoryPage() {
  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center gap-6">
        <Link
          href="/manage/categories"
          className="p-4 bg-white hover:bg-gray-900 hover:text-white rounded-[1.5rem] border border-gray-100 transition-all text-gray-400 shadow-xl shadow-gray-200/50 group"
        >
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            Create New Category
            <span className="text-[10px] font-black text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-widest translate-y-[-2px]">
              Organization
            </span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Organize your products into a new group.
          </p>
        </div>
      </div>

      <CategoryForm />
    </div>
  );
}

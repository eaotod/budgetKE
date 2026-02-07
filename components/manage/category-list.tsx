"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Edit02Icon,
  Folder01Icon,
  LinkSquare01Icon,
  MoreVerticalIcon,
} from "@hugeicons/core-free-icons";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteAction } from "@/components/manage/delete-action";

interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  display_order: number | null;
  product_count: number | null;
  created_at: string;
}

export function CategoryList({ categories }: { categories: CategoryRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
            <th className="px-6 py-5">Name</th>
            <th className="px-6 py-5">Slug</th>
            <th className="px-6 py-5 text-center">Products</th>
            <th className="px-6 py-5">Created</th>
            <th className="px-6 py-5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {categories.map((category) => (
            <tr
              key={category.id}
              className="hover:bg-gray-50/30 transition-colors group"
            >
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <HugeiconsIcon icon={Folder01Icon} className="w-5 h-5" />
                  </div>
                  <div className="font-bold text-gray-900">{category.name}</div>
                </div>
              </td>
              <td className="px-6 py-5 text-sm font-medium text-gray-500">
                {category.slug}
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
                    <HugeiconsIcon
                      icon={LinkSquare01Icon}
                      className="w-4 h-4"
                    />
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100">
                        <HugeiconsIcon
                          icon={MoreVerticalIcon}
                          className="w-4 h-4"
                        />
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
                          <HugeiconsIcon
                            icon={Edit02Icon}
                            className="w-4 h-4 text-gray-500"
                          />
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
  );
}

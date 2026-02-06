"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardCircleIcon,
  PackageIcon,
  AlignLeftIcon,
  FolderFavouriteIcon,
  Settings02Icon,
  Logout01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: DashboardCircleIcon, label: "Overview", href: "/manage" },
  { icon: PackageIcon, label: "Products", href: "/manage/products" },
  {
    icon: FolderFavouriteIcon,
    label: "Categories",
    href: "/manage/categories",
  },
  { icon: AlignLeftIcon, label: "Bundles", href: "/manage/bundles" },
  { icon: Settings02Icon, label: "Settings", href: "/manage/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-50">
      {/* Brand Section */}
      <div className="p-8">
        <Link href="/" className="inline-block group">
          <div className="relative w-[140px] h-10 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/logo.svg"
              alt="BudgetKE Logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="mt-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-100" />
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-2 py-1 bg-primary/5 rounded-full">
            Admin
          </span>
          <div className="h-px flex-1 bg-gray-100" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300",
                isActive
                  ? "bg-gray-900 text-white shadow-xl shadow-gray-200/50"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "p-1.5 rounded-lg transition-colors",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-gray-400 group-hover:text-gray-600",
                  )}
                >
                  <HugeiconsIcon icon={item.icon} className="w-5 h-5" />
                </div>
                <span className="tracking-tight">{item.label}</span>
              </div>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className={cn(
                  "w-4 h-4 transition-all duration-300 transform",
                  isActive
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
                )}
              />
            </Link>
          );
        })}
      </nav>

      {/* Footer / Account */}
      <div className="p-6 mt-auto border-t border-gray-100 bg-gray-50/50">
        <button className="flex items-center gap-4 px-4 py-4 w-full text-sm font-black text-gray-500 hover:text-red-600 transition-all group rounded-2xl hover:bg-red-50">
          <div className="p-2 rounded-xl bg-white border border-gray-100 group-hover:border-red-100 group-hover:text-red-600 transition-all">
            <HugeiconsIcon icon={Logout01Icon} className="w-5 h-5" />
          </div>
          <span className="tracking-tight">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

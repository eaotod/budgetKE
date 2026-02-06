import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs, BreadcrumbJsonLd } from "@/components/ui/breadcrumbs";
import { ProductCard } from "@/components/ui/product-card";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { FilterInput } from "@/components/ui/filter-input";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { mapProducts } from "@/lib/mappers";

export const metadata: Metadata = {
  title:
    "Financial Templates Kenya | Budget Planners & Business Tools | BudgetKE",
  description:
    "Browse professional Excel and Google Sheets templates for personal finance and business. Budget planners, bookkeeping, inventory tracking, and more. Made for Kenyans.",
  openGraph: {
    title: "Financial Templates Kenya | BudgetKE",
    description:
      "Professional Excel & Google Sheets templates for Kenyan finances. Budget planners, bookkeeping, and more.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/templates`,
    siteName: "BudgetKE",
    locale: "en_KE",
    type: "website",
  },
};

interface TemplatesPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function TemplatesPage({
  searchParams,
}: TemplatesPageProps) {
  const resolvedSearchParams = await searchParams;
  const selectedCategory = resolvedSearchParams.category;
  const searchQuery = resolvedSearchParams.search?.toLowerCase();
  const page = parseInt(resolvedSearchParams.page || "1", 10);
  const pageSize = 8;

  const supabase = await createClient();

  // 1. Fetch Categories
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("display_order", { ascending: true });

  // 2. Fetch Products with filtering
  let query = supabase
    .from("products")
    .select("*", { count: "exact" })
    .eq("status", "active");

  if (selectedCategory) {
    query = query.eq("category_id", selectedCategory);
  }

  if (searchQuery) {
    query = query.or(
      `name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,short_description.ilike.%${searchQuery}%`,
    );
  }

  const { data: products, count: totalProducts } = await query
    .order("created_at", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  const activeCategory = categories?.find((c) => c.slug === selectedCategory);

  // Pagination
  const totalPages = Math.ceil((totalProducts || 0) / pageSize);
  const start = (page - 1) * pageSize;

  const filteredProducts = mapProducts(products || []);

  const breadcrumbItems = [
    { label: "Templates", href: "/templates" },
    ...(activeCategory ? [{ label: activeCategory.name }] : []),
    ...(searchQuery ? [{ label: `Search: ${searchQuery}` }] : []),
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <Navbar />

      <main className="md:pt-32 pt-28 pb-20 bg-gray-50/50 min-h-screen">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} className="mb-8" />

          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                {searchQuery ? (
                  <>
                    Search Results for{" "}
                    <span className="text-primary">"{searchQuery}"</span>
                  </>
                ) : activeCategory ? (
                  activeCategory.name
                ) : (
                  "All Templates"
                )}
              </h1>
              <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-2xl">
                {activeCategory
                  ? activeCategory.description
                  : "Professional Excel and Google Sheets templates designed for Kenyan finances. Instant download after M-Pesa payment."}
              </p>
            </div>

            <div className="w-full lg:w-96 shrink-0">
              <React.Suspense
                fallback={
                  <div className="h-14 bg-white/50 animate-pulse rounded-2xl" />
                }
              >
                <FilterInput
                  placeholder="Search templates..."
                  className="shadow-xl shadow-gray-200/50"
                />
              </React.Suspense>
            </div>
          </div>

          {/* Category filters */}
          {!searchQuery && (
            <div className="flex flex-wrap gap-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
              <Link href="/templates">
                <Badge
                  variant={!selectedCategory ? "default" : "secondary"}
                  className={cn(
                    "h-10 px-6 rounded-full text-sm font-bold cursor-pointer transition-all hover:scale-105 active:scale-95",
                    !selectedCategory
                      ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20"
                      : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200",
                  )}
                >
                  All Templates
                </Badge>
              </Link>
              {categories?.map((category) => (
                <Link
                  key={category.id}
                  href={`/templates?category=${category.slug}`}
                >
                  <Badge
                    variant={
                      selectedCategory === category.slug
                        ? "default"
                        : "secondary"
                    }
                    className={cn(
                      "h-10 px-6 rounded-full text-sm font-bold cursor-pointer transition-all hover:scale-105 active:scale-95",
                      selectedCategory === category.slug
                        ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20"
                        : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200",
                    )}
                  >
                    {category.name}
                  </Badge>
                </Link>
              ))}
            </div>
          )}

          {/* Results count & Clear */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
              Showing {start + 1}-
              {Math.min(start + pageSize, totalProducts || 0)} of{" "}
              {totalProducts || 0} templates
            </p>
            {(selectedCategory || searchQuery) && (
              <Link
                href="/templates"
                className="text-sm font-bold text-gray-900 hover:text-primary transition-colors flex items-center gap-2"
              >
                Clear Filters
                <HugeiconsIcon icon={Cancel01Icon} size={16} />
              </Link>
            )}
          </div>

          {/* Products grid */}
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  // We can wrap ProductCard to add some entry animation if desired
                  <ProductCard key={product.id} product={product as any} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-16 flex justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => {
                      const isCurrent = p === page;
                      // Simple pagination logic, for many pages we'd need ellipsis

                      // Construct search string keeping other params
                      const params = new URLSearchParams();
                      if (selectedCategory)
                        params.set("category", selectedCategory);
                      if (searchQuery) params.set("search", searchQuery);
                      params.set("page", p.toString());

                      return (
                        <Link key={p} href={`/templates?${params.toString()}`}>
                          <button
                            className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all",
                              isCurrent
                                ? "bg-gray-900 text-white shadow-lg shadow-gray-900/20 scale-110"
                                : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-gray-200",
                            )}
                          >
                            {p}
                          </button>
                        </Link>
                      );
                    },
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl opacity-50">🔍</span>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">
                No templates found
              </h2>
              <p className="text-gray-500 font-medium mb-8 max-w-sm">
                We couldn't find exactly what you're looking for. Try adjusting
                your search or filters.
              </p>
              <Link href="/templates">
                <Button className="h-14 px-8 rounded-full bg-gray-900 hover:bg-gray-800 text-white font-bold shadow-xl shadow-gray-200">
                  View All Templates
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

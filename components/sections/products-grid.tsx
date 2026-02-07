"use client";

import { useState, useMemo } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 12;

import { Product, Category } from "@/lib/types";

export function ProductsSection({
  products: allProducts,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter products based on category
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.categoryId === activeCategory;
      return matchesCategory;
    });
  }, [activeCategory, allProducts]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };

  return (
    <section
      id="products"
      className="py-16 md:py-24 bg-white border-t border-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Toolbar: Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-end gap-6 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleCategoryChange("all")}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-bold transition-all border",
                activeCategory === "all"
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/10"
                  : "bg-white border-border/50 text-gray-500 hover:border-gray-300",
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold transition-all border",
                  activeCategory === cat.id
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/10"
                    : "bg-white border-border/50 text-gray-500 hover:border-gray-300",
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-white shadow-sm rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl">
              🔍
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">
              No templates found
            </h3>
            <p className="text-gray-500 max-w-xs mx-auto">
              Try adjusting your filters or search keywords to find what
              you&apos;re looking for.
            </p>
            <Button
              variant="link"
              className="mt-6 text-primary font-bold"
              onClick={() => {
                setActiveCategory("all");
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-20 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="rounded-full w-10 h-10 border-gray-100 hover:bg-primary hover:text-white hover:border-primary transition-all"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      "w-10 h-10 rounded-full text-sm font-bold transition-all",
                      currentPage === page
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-gray-400 hover:text-gray-900 hover:bg-gray-50",
                    )}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              className="rounded-full w-12 h-12 border-2 hover:bg-primary hover:text-white hover:border-primary transition-all"
            >
              <HugeiconsIcon icon={ArrowRight01Icon} className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

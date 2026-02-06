import Link from "next/link";
import {
  ArrowRight01Icon,
  FireIcon,
  CheckmarkBadge01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";

interface FeaturedTemplatesProps {
  products: Product[];
  title?: string;
  description?: string;
  showViewAll?: boolean;
}

export function FeaturedTemplates({
  products,
  title = "Our Best Sellers",
  description = "Join 12,000+ Kenyans using these top-rated financial templates.",
  showViewAll = true,
}: FeaturedTemplatesProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-50/30 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
              <HugeiconsIcon
                icon={FireIcon}
                size={14}
                className="text-orange-500 fill-orange-500"
              />
              Trending Now
            </div>

            <h2 className="mb-6">{title}</h2>

            <p>{description}</p>
          </div>

          {showViewAll && (
            <div>
              <Button
                variant="ghost"
                asChild
                className="group/all text-primary font-bold hover:bg-primary/5 rounded-2xl px-6 py-6"
              >
                <Link href="/templates" className="flex items-center gap-2">
                  Shop All Templates
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={20}
                    className="transition-transform group-hover/all:translate-x-1"
                  />
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Products grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product, index) => (
            <div key={product.id} className="relative">
              {/* Special Best Seller Badge overlay */}
              {index < 3 && (
                <div className="absolute -top-3 -right-3 z-20">
                  <div className="bg-amber-400 text-amber-950 text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-1">
                    <HugeiconsIcon icon={CheckmarkBadge01Icon} size={12} />
                    TOP CHOICE
                  </div>
                </div>
              )}

              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

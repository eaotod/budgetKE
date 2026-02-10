"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart01Icon,
  FireIcon,
  PackageIcon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";
import type { Bundle } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BundleCardProps {
  bundle: Bundle;
  className?: string;
  priority?: boolean;
}

export function BundleCard({ bundle, className }: BundleCardProps) {
  const { addItem, items, openCart } = useCartStore();
  const isInCart = items.some((item) => item.id === bundle.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: bundle.id,
      type: "bundle",
      name: bundle.name,
      price: bundle.bundlePrice,
      image: bundle.thumbnailUrl,
    });
  };

  const discountPercent = Math.round(
    ((bundle.originalPrice - bundle.bundlePrice) / bundle.originalPrice) * 100,
  );

  return (
    <div
      className={cn(
        "group relative bg-white rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full overflow-hidden",
        className,
      )}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {bundle.isFeatured && (
          <Badge className="w-10 h-10 rounded-full bg-orange-500 text-white hover:bg-orange-600 font-bold shadow-lg border-none p-0 flex flex-col items-center justify-center text-[8px]">
            <HugeiconsIcon icon={FireIcon} size={12} className="fill-white" />
            HOT
          </Badge>
        )}
        <Badge className="w-10 h-10 rounded-full bg-purple-600 text-white hover:bg-purple-700 font-bold shadow-lg border-none p-0 flex flex-col items-center justify-center text-[8px]">
          <HugeiconsIcon icon={PackageIcon} size={12} className="fill-white" />
          SET
        </Badge>
        <Badge className="w-10 h-10 rounded-full bg-primary text-white hover:bg-primary font-bold shadow-md border-none p-0 flex flex-col items-center justify-center text-[10px]">
          -{discountPercent}%
        </Badge>
      </div>

      {/* Image */}
      <Link href={`/bundles/${bundle.slug}`} className="block p-2">
        <div className="relative aspect-4/3 bg-gray-50 rounded-tl-[3.5rem] rounded-tr-[1rem] rounded-bl-[1rem] rounded-br-[3.5rem] overflow-hidden group/img">
          {bundle.thumbnailUrl ? (
            <Image
              src={bundle.thumbnailUrl}
              alt={bundle.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover/img:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50/50">
              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto mb-3 bg-white shadow-sm rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/5 transition-colors duration-500" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 pt-2 flex flex-col grow">
        <div className="flex items-end justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Title */}
            <Link
              href={`/bundles/${bundle.slug}`}
              className="block group/title"
            >
              <h3 className="text-sm font-bold text-gray-900 group-hover/title:text-primary transition-colors line-clamp-2 leading-snug mb-2">
                {bundle.name}
              </h3>
            </Link>

            {/* Price */}
            <div className="flex flex-col">
              <span className="text-base font-bold text-gray-900 tracking-tight">
                KES {bundle.bundlePrice.toLocaleString()}
              </span>
              <span className="text-[10px] text-gray-400 line-through font-medium">
                KES {bundle.originalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Add to Cart Circular Button */}
          <button
            onClick={
              isInCart
                ? (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openCart();
                  }
                : handleAddToCart
            }
            className={cn(
              "group/btn relative w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 shadow-sm",
              isInCart
                ? "bg-green-100 text-green-600 hover:bg-green-200 hover:shadow-green-100"
                : "bg-gray-50 hover:bg-primary text-gray-900 hover:text-white hover:shadow-lg hover:shadow-primary/20",
            )}
            aria-label={isInCart ? "View bundle in cart" : "Add bundle to cart"}
          >
            {isInCart ? (
              <HugeiconsIcon
                icon={Tick01Icon}
                size={20}
                className="transition-transform group-hover/btn:scale-110"
              />
            ) : (
              <HugeiconsIcon
                icon={ShoppingCart01Icon}
                size={20}
                className="transition-transform group-hover/btn:scale-110"
              />
            )}
          </button>
        </div>

        {/* Included items count */}
        <div className="mt-3 pt-3 border-t border-gray-50">
          <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            Includes {bundle.productIds.length} premium templates
          </p>
        </div>
      </div>
    </div>
  );
}

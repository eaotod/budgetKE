"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Shield01Icon,
  ZapIcon,
  Refresh01Icon,
  Download01Icon,
  Table01Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PriceDisplay } from "@/components/ui/price-display";
import { StarRating } from "@/components/ui/star-rating";
import { useCartStore } from "@/lib/cart-store";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
  product: Product;
}

const trustBadges = [
  { icon: Shield01Icon, label: "Secure M-Pesa" },
  { icon: ZapIcon, label: "Instant Download" },
  { icon: Refresh01Icon, label: "Free Updates" },
];

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem, items } = useCartStore();
  const isInCart = items.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      type: "product",
      name: product.name,
      price: product.price,
      image: product.thumbnailUrl,
    });
  };

  const handleBuyNow = () => {
    // 1. Add item
    addItem({
      id: product.id,
      type: "product",
      name: product.name,
      price: product.price,
      image: product.thumbnailUrl,
    });

    // 2. Open cart via store (already handled by addItem, but let's be explicit if needed)
    // Actually addItem sets isOpen: true.
    // We want to simulate a brief "added" moment then go to checkout.

    // 3. Redirect after a short delay to let user see it was added
    setTimeout(() => {
      window.location.href = "/checkout";
    }, 1000); // 1 second delay
  };

  return (
    <div className="space-y-8">
      {/* Badges */}
      <div className="flex flex-wrap gap-3">
        <Link href={`/templates?category=${product.categoryId}`}>
          <Badge
            variant="secondary"
            className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
          >
            {product.category?.name || product.categoryId}
          </Badge>
        </Link>
        {product.isBestseller && (
          <Badge className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border-none">
            ⭐ Bestseller
          </Badge>
        )}
        {product.isNew && (
          <Badge className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border-none">
            New Arrival
          </Badge>
        )}
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight">
        {product.name}
      </h1>

      {/* Rating */}
      {product.reviewCount > 0 && (
        <div className="flex items-center gap-3">
          <StarRating
            rating={product.rating}
            showValue
            reviewCount={product.reviewCount}
          />
          <div className="w-1 h-1 rounded-full bg-gray-300" />
          <Link
            href="#reviews"
            className="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
          >
            Read all {product.reviewCount} reviews
          </Link>
        </div>
      )}

      {/* Short description */}
      <p className="text-xl text-gray-500 leading-relaxed font-medium">
        {product.shortDescription}
      </p>

      {/* Price */}
      <div className="pt-2">
        <PriceDisplay
          price={product.price}
          comparePrice={product.comparePrice}
          size="lg"
        />
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
        <Button
          size="lg"
          className={cn(
            "rounded-full text-base font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:flex-1 h-14 uppercase tracking-widest",
            isInCart ? "bg-green-500 hover:bg-green-600 shadow-green-200" : "",
          )}
          onClick={
            isInCart ? () => (window.location.href = "/checkout") : handleBuyNow
          }
        >
          {isInCart ? (
            <span className="flex items-center gap-2">
              Proceed to Checkout
              <HugeiconsIcon icon={Tick01Icon} size={20} />
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Buy Now
              <HugeiconsIcon icon={ZapIcon} size={20} />
            </span>
          )}
        </Button>
        <Button
          size="lg"
          variant="outline"
          className={cn(
            "rounded-full text-base font-bold border-gray-200 hover:bg-gray-50 hover:text-gray-900 w-full sm:flex-1 h-14 uppercase tracking-widest",
            isInCart
              ? "bg-gray-50 text-gray-400 cursor-not-allowed hover:bg-gray-50"
              : "",
          )}
          onClick={isInCart ? undefined : handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? "Added to Cart" : "Add to Cart"}
        </Button>
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 border-t border-gray-100">
        {trustBadges.map((badge, index) => (
          <div key={index} className="flex items-center gap-2.5 text-gray-600">
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-primary">
              <HugeiconsIcon icon={badge.icon} size={16} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">
              {badge.label}
            </span>
          </div>
        ))}
      </div>

      {/* File info */}
      <div className="bg-gray-50/50 rounded-[2rem] p-8 space-y-6 border border-gray-100/50">
        <h3 className="font-bold text-gray-900 flex items-center gap-3 text-lg">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <HugeiconsIcon icon={Download01Icon} size={20} />
          </div>
          What&apos;s Included
        </h3>

        <div className="grid grid-cols-2 gap-6">
          {product.fileFormat && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-gray-400 shadow-sm">
                <HugeiconsIcon icon={Table01Icon} size={14} />
              </div>
              <span className="text-sm font-bold text-gray-600">
                {product.fileFormat}
              </span>
            </div>
          )}
          {product.fileSize && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-gray-400 shadow-sm">
                <HugeiconsIcon icon={Download01Icon} size={14} />
              </div>
              <span className="text-sm font-bold text-gray-600">
                {product.fileSize}
              </span>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-gray-200/50 space-y-3">
          {/* Show new format if available */}
          {product.whatsIncluded && product.whatsIncluded.length > 0 ? (
            product.whatsIncluded.slice(0, 3).map((item, index) => {
              const title = item.split(" - ")[0];
              return (
                <p
                  key={index}
                  className="text-sm font-medium text-gray-500 flex items-center gap-3"
                >
                  <HugeiconsIcon
                    icon={Tick01Icon}
                    size={16}
                    className="text-primary"
                  />
                  {title}
                </p>
              );
            })
          ) : (
            // Fallback to default for legacy products
            <>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-3">
                <HugeiconsIcon
                  icon={Tick01Icon}
                  size={16}
                  className="text-primary"
                />
                Lifetime access & free updates
              </p>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-3">
                <HugeiconsIcon
                  icon={Tick01Icon}
                  size={16}
                  className="text-primary"
                />
                Works on Excel, Google Sheets & Mobile
              </p>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-3">
                <HugeiconsIcon
                  icon={Tick01Icon}
                  size={16}
                  className="text-primary"
                />
                Step-by-step video tutorial
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

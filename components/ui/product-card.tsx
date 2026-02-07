"use client";

import Link from "next/link";
import {
  ShoppingCart01Icon,
  StarIcon,
  FireIcon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem, items, openCart } = useCartStore();
  const isInCart = items.some((item) => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      type: "product",
      name: product.name,
      price: product.price,
      image: product.thumbnailUrl,
    });
  };

  const hasDiscount =
    product.comparePrice && product.comparePrice > product.price;
  const discountPercent =
    hasDiscount && product.comparePrice
      ? Math.round(
          ((product.comparePrice - product.price) / product.comparePrice) * 100,
        )
      : 0;

  return (
    <div
      className={cn(
        "group relative bg-white rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full overflow-hidden",
        className,
      )}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isBestseller && (
          <Badge className="w-10 h-10 rounded-full bg-orange-500 text-white hover:bg-orange-600 font-bold shadow-lg border-none p-0 flex flex-col items-center justify-center text-[8px]">
            <HugeiconsIcon icon={FireIcon} size={12} className="fill-white" />
            HOT
          </Badge>
        )}
        {product.isNew && (
          <Badge className="w-10 h-10 rounded-full bg-primary text-white hover:bg-primary font-bold shadow-lg border-none p-0 flex items-center justify-center text-[8px]">
            NEW
          </Badge>
        )}
        {hasDiscount && (
          <Badge className="w-10 h-10 rounded-full bg-white text-gray-900 font-bold shadow-md border-none p-0 flex flex-col items-center justify-center text-[10px]">
            -{discountPercent}%
          </Badge>
        )}
      </div>

      {/* Image */}
      <Link href={`/templates/${product.slug}`} className="block p-2">
        <div className="relative aspect-4/3 bg-gray-50 rounded-tl-[3.5rem] rounded-tr-[1rem] rounded-bl-[1rem] rounded-br-[3.5rem] overflow-hidden group/img">
          {product.thumbnailUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.thumbnailUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50/50">
              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto mb-3 bg-white shadow-sm rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">📊</span>
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
              href={`/templates/${product.slug}`}
              className="block group/title"
            >
              <h3 className="text-sm font-bold text-gray-900 group-hover/title:text-primary transition-colors line-clamp-2 leading-snug mb-2">
                {product.name}
              </h3>
            </Link>

            {/* Price */}
            <div className="flex flex-col">
              <span className="text-base font-bold text-gray-900 tracking-tight">
                KES {product.price.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-[10px] text-gray-400 line-through font-medium">
                  KES {product.comparePrice?.toLocaleString()}
                </span>
              )}
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
            aria-label={isInCart ? "View in cart" : "Add to cart"}
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
      </div>
    </div>
  );
}

// Compact card for related products
export function ProductCardCompact({ product }: { product: Product }) {
  return (
    <Link
      href={`/templates/${product.slug}`}
      className="group flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-100"
    >
      <div className="w-20 h-20 bg-gray-50 rounded-xl shrink-0 overflow-hidden relative">
        {product.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.thumbnailUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl bg-white">
            📊
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0 py-1">
        <h4 className="font-black text-foreground truncate group-hover:text-primary transition-colors text-sm">
          {product.name}
        </h4>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mt-2 font-bold uppercase tracking-widest">
          <HugeiconsIcon
            icon={StarIcon}
            size={12}
            className="text-amber-400 fill-amber-400"
          />
          <span>{product.rating.toFixed(1)}</span>
        </div>
        <p className="text-sm font-black text-foreground mt-2 tracking-tighter">
          KES {product.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}

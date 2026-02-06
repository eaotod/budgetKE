"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Shield01Icon,
  ZapIcon,
  Refresh01Icon,
  ShoppingBasket01Icon,
  PackageIcon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";
import type { Bundle } from "@/lib/types";

interface BundleInfoProps {
  bundle: Bundle;
}

const trustBadges = [
  { icon: Shield01Icon, label: "Secure M-Pesa" },
  { icon: ZapIcon, label: "Instant Download" },
  { icon: Refresh01Icon, label: "Free Updates" },
];

export function BundleInfo({ bundle }: BundleInfoProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: bundle.id,
      type: "bundle",
      name: bundle.name,
      price: bundle.bundlePrice,
      image: bundle.thumbnailUrl,
    });
  };

  const handleBuyNow = () => {
    addItem({
      id: bundle.id,
      type: "bundle",
      name: bundle.name,
      price: bundle.bundlePrice,
      image: bundle.thumbnailUrl,
    });

    // Redirect logic
    setTimeout(() => {
      window.location.href = "/checkout";
    }, 1000);
  };

  const discountPercent = Math.round(
    ((bundle.originalPrice - bundle.bundlePrice) / bundle.originalPrice) * 100,
  );

  return (
    <div className="space-y-8">
      {/* Badges */}
      <div className="flex flex-wrap gap-3">
        <Badge className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-600 text-white border-none">
          <HugeiconsIcon
            icon={PackageIcon}
            size={12}
            className="mr-1 fill-white"
          />
          Bundle Deal
        </Badge>
        <Badge className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border-none">
          Save {discountPercent}%
        </Badge>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight">
        {bundle.name}
      </h1>

      {/* Short description */}
      <p className="text-xl text-gray-500 leading-relaxed font-medium">
        {bundle.shortDescription}
      </p>

      {/* Price */}
      <div className="pt-2 flex items-baseline gap-3">
        <span className="text-4xl font-black text-gray-900 tracking-tighter">
          KES {bundle.bundlePrice.toLocaleString()}
        </span>
        <span className="text-xl font-bold text-gray-400 line-through decoration-2 decoration-gray-300">
          KES {bundle.originalPrice.toLocaleString()}
        </span>
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-bold">
        <HugeiconsIcon icon={Tick01Icon} size={16} />
        You save KES {bundle.savings.toLocaleString()}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          size="lg"
          onClick={handleBuyNow}
          className="h-16 px-10 bg-primary text-white hover:bg-primary/90 rounded-2xl font-bold text-lg shadow-xl shadow-primary/10 transition-all active:scale-[0.98] flex-[1.5]"
        >
          <HugeiconsIcon
            icon={ZapIcon}
            size={20}
            className="mr-3 fill-current"
          />
          Get Full Bundle
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={handleAddToCart}
          className="h-16 px-8 rounded-2xl border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-bold transition-all flex-1"
        >
          <HugeiconsIcon
            icon={ShoppingBasket01Icon}
            size={20}
            className="mr-3"
          />
          Add to Cart
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
    </div>
  );
}

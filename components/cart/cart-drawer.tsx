"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShoppingBag02Icon,
  Cancel01Icon,
  Delete02Icon,
  ArrowRight02Icon,
} from "@hugeicons/core-free-icons";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
// import { cn } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    clearCart,
    // updateQuantity,
    subtotal,
    itemCount,
  } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0 gap-0 border-l border-gray-100 bg-white">
        <SheetHeader className="p-6 border-b border-gray-100 bg-white/80 backdrop-blur-xl sticky top-0 z-10">
          <SheetTitle className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 text-xl font-black text-gray-900 tracking-tight">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <HugeiconsIcon icon={ShoppingBag02Icon} size={20} />
                </div>
                Your Cart
                {itemCount > 0 && (
                  <span className="text-sm font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200">
                    {itemCount}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {itemCount > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs font-bold text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-full transition-colors uppercase tracking-wider"
                >
                  Clear
                </button>
              )}
              <button
                onClick={closeCart}
                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={24} />
              </button>
            </div>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-6">
              <HugeiconsIcon
                icon={ShoppingBag02Icon}
                size={40}
                className="text-gray-300"
              />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mb-8 max-w-xs font-medium leading-relaxed">
              Browse our templates and find the perfect tools for your financial
              goals.
            </p>
            <Button
              onClick={closeCart}
              asChild
              className="h-14 px-8 rounded-full text-base font-bold bg-gray-900 hover:bg-gray-800 text-white shadow-xl shadow-gray-200"
            >
              <Link href="/templates">Start Browsing</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-5 p-4 bg-white rounded-3xl border border-gray-100 hover:border-gray-200 transition-colors group"
                >
                  {/* Image placeholder */}
                  <div className="w-24 h-24 bg-gray-50 rounded-2xl shrink-0 flex items-center justify-center overflow-hidden border border-gray-100">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <HugeiconsIcon
                        icon={ShoppingBag02Icon}
                        size={24}
                        className="text-gray-300"
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-bold text-gray-900 truncate tracking-tight text-lg">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <HugeiconsIcon icon={Delete02Icon} size={18} />
                        </button>
                      </div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        {item.type}
                      </p>
                    </div>

                    <div className="flex items-end justify-between gap-4">
                      <div className="text-lg font-black text-gray-900">
                        KES {item.price.toLocaleString()}
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-full">
                          In Cart
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span>KES {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xl font-black text-gray-900">
                  <span>Total</span>
                  <span>KES {subtotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={closeCart}
                  asChild
                  className="w-full h-14 text-base font-bold rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 uppercase tracking-widest"
                >
                  <Link href="/checkout" className="flex items-center gap-2">
                    Checkout Securely
                    <HugeiconsIcon icon={ArrowRight02Icon} size={20} />
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  onClick={closeCart}
                  className="w-full h-12 text-sm font-bold text-gray-500 hover:text-gray-900 rounded-full hover:bg-white"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

// Cart trigger button for navbar
export function CartButton() {
  const { openCart, itemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <button
      onClick={openCart}
      className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors group"
      aria-label="Open cart"
    >
      <HugeiconsIcon
        icon={ShoppingBag02Icon}
        size={22}
        className="text-gray-600 group-hover:text-gray-900 transition-colors"
      />
      {mounted && itemCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </button>
  );
}

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartButton, CartDrawer } from "@/components/cart/cart-drawer";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Templates", href: "/templates" },
  { name: "Bundles", href: "/bundles" },
  { name: "Categories", href: "/categories" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
          isScrolled ? "py-4" : "py-6",
        )}
      >
        <div className="container mx-auto px-4">
          <nav
            className={cn(
              "mx-auto transition-all duration-500 ease-in-out flex items-center justify-between px-6 py-3",
              isScrolled
                ? "bg-white/80 backdrop-blur-md shadow-sm border border-white/20 rounded-full max-w-5xl"
                : "bg-transparent max-w-7xl",
            )}
          >
            {/* Desktop Navigation - Left */}
            <div className="hidden lg:flex items-center gap-6 w-1/3">
              <Link
                href="/templates"
                className="text-sm font-black text-gray-700 hover:text-primary transition-colors uppercase tracking-widest"
              >
                Categories
              </Link>
              <Link
                href="/bundles"
                className="text-sm font-black text-gray-700 hover:text-primary transition-colors uppercase tracking-widest"
              >
                Bundles
              </Link>
            </div>

            {/* Logo - Center */}
            <div className="flex justify-center w-1/3">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div
                  className={cn(
                    "relative w-[140px] h-10 transition-all duration-300 transform group-hover:scale-105",
                  )}
                >
                  <Image
                    src="/images/logo.svg"
                    alt="BudgetKE Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Right */}
            <div className="hidden lg:flex items-center justify-end gap-6 w-1/3">
              <Link
                href="/blog"
                className="text-sm font-black text-gray-700 hover:text-primary transition-colors uppercase tracking-widest"
              >
                Blog
              </Link>

              <Link
                href="/account"
                className="p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Account"
              >
                <UserIcon className="w-5 h-5" />
              </Link>

              <CartButton />

              <Link
                href="/custom-template"
                className="text-sm font-black whitespace-nowrap text-primary hover:text-primary/80 transition-colors uppercase tracking-widest"
              >
                Custom Template
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-4">
              <CartButton />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
          />

          <div className="fixed top-24 left-4 right-4 bg-white rounded-3xl shadow-2xl z-50 lg:hidden overflow-hidden border border-gray-100 p-6 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-primary transition-colors group"
                >
                  <span className="font-medium text-lg">{item.name}</span>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <Button
                asChild
                className="w-full h-12 text-base rounded-xl shadow-lg shadow-primary/20"
              >
                <Link
                  href="/custom-template"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Custom Template
                </Link>
              </Button>
            </div>
          </div>
        </>
      )}

      <CartDrawer />
    </>
  );
}

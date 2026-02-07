"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  ArrowRight02Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Button } from "./button";

interface SearchResult {
  id: string;
  name: string;
  category: string;
  price: number;
  slug: string;
  image?: string;
}

interface SearchProps {
  className?: string;
  variant?: "minimal" | "large";
}

export function Search({ className, variant = "minimal" }: SearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("search") || "";

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery] = useDebounce(query, 300);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update query if URL changes externally
  useEffect(() => {
    const urlQuery = searchParams.get("search") || "";
    if (urlQuery !== query && !isOpen) {
      setQuery(urlQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Fetch results when debounced query changes (catalog API)
  useEffect(() => {
    async function fetchResults() {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        setResults([]);
        if (debouncedQuery === "") setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedQuery)}`,
        );
        const data = await res.json();

        setResults(Array.isArray(data) ? data : []);
        setIsOpen(true);
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchResults();
  }, [debouncedQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      router.push(`/templates?search=${encodeURIComponent(query)}`);
      setIsOpen(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    if (searchParams.get("search")) {
      router.push("/templates");
    }
  };

  return (
    <div ref={wrapperRef} className={cn("relative w-full", className)}>
      <form onSubmit={handleSearch} className="relative">
        <div
          className={cn(
            "relative group flex items-center transition-all",
            variant === "large"
              ? "bg-white border-2 border-gray-100 rounded-[2.5rem] p-2 pr-4 shadow-sm shadow-gray-200/50 group-hover:border-primary/20"
              : "rounded-full bg-gray-100/50 border-transparent focus-within:bg-white focus-within:border-primary/20 focus-within:ring-4 focus-within:ring-primary/10",
          )}
        >
          <div
            className={cn(
              "shrink-0 flex items-center justify-center",
              variant === "large" ? "pl-6 pr-4" : "pl-4 pr-1",
            )}
          >
            <HugeiconsIcon
              icon={Search01Icon}
              size={variant === "large" ? 24 : 20}
              className={cn(
                "text-gray-400 group-focus-within:text-primary transition-colors",
              )}
            />
          </div>

          <Input
            type="text"
            placeholder={
              variant === "large"
                ? "Search for 'Personal Budget', 'Bookkeeping'..."
                : "Search templates, bundles..."
            }
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.length > 1) setIsOpen(true);
            }}
            onFocus={() => {
              if (query.length > 1) setIsOpen(true);
            }}
            className={cn(
              "flex-1 bg-transparent border-none focus:ring-0 outline-0 focus-visible:ring-0 shadow-none h-auto placeholder:text-gray-400 placeholder:font-medium placeholder:text-base",
              variant === "large" ? "text-lg font-medium h-14" : "text-sm h-11",
            )}
          />

          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className={cn(
                "p-1 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all mr-2 shrink-0",
                variant === "large"
                  ? "relative"
                  : "absolute right-4 top-1/2 -translate-y-1/2",
              )}
            >
              <HugeiconsIcon icon={Cancel01Icon} size={16} />
            </button>
          )}

          {variant === "large" && (
            <Button
              type="submit"
              className="h-12 px-8 rounded-full font-black text-sm shadow-sm shadow-primary/20 shrink-0"
            >
              Search
            </Button>
          )}
        </div>
      </form>

      {/* Dropdown Results */}
      {isOpen && query.length > 1 && (
        <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden z-50 p-2 animate-in fade-in zoom-in-95 duration-200">
          {isLoading ? (
            <div className="p-8 text-center text-gray-400 text-sm font-medium flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              Searching...
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="px-3 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Products
              </div>
              <div className="space-y-1">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    href={`/templates/${result.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                      {result.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={result.image}
                          alt={result.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <HugeiconsIcon icon={Search01Icon} size={20} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm truncate group-hover:text-primary transition-colors">
                        {result.name}
                      </h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500 font-medium">
                          {result.category}
                        </span>
                        <span className="text-xs font-black text-gray-900">
                          KES {result.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-2 pt-2">
                <Button
                  variant="ghost"
                  className="w-full justify-between h-9 text-xs font-bold text-primary hover:text-primary hover:bg-primary/5"
                  onClick={() => {
                    router.push(
                      `/templates?search=${encodeURIComponent(query)}`,
                    );
                    setIsOpen(false);
                  }}
                >
                  View all results for &quot;{query}&quot;
                  <HugeiconsIcon icon={ArrowRight02Icon} size={14} />
                </Button>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-900 font-bold mb-1">No results found</p>
              <p className="text-sm text-gray-500">
                Try checking for typos or searching for a different term
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

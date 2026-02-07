"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { Input } from "./input";

interface FilterInputProps {
  className?: string;
  placeholder?: string;
}

export function FilterInput({
  className,
  placeholder = "Search...",
}: FilterInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("search") || "";
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery] = useDebounce(query, 500);

  // Update URL whenever debounced query changes
  useEffect(() => {
    // Skip the first render if initialQuery is empty and debouncedQuery is empty
    // Or if the debouncedQuery is the same as the initialQuery from the URL
    if (debouncedQuery === initialQuery && query === initialQuery) return;

    const params = new URLSearchParams(searchParams.toString());
    if (debouncedQuery) {
      params.set("search", debouncedQuery);
    } else {
      params.delete("search");
    }
    params.set("page", "1"); // Reset to page 1 on new search

    // Determine the base path (e.g., /templates or /bundles)
    const pathname = window.location.pathname;
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  // Synchronize state with URL if changed externally (e.g., clearing filters)
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    if (urlSearch !== query) {
      setQuery(urlSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative group">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-14 pl-12 pr-12 rounded-2xl bg-white border-2 border-gray-100 focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all font-medium text-lg text-gray-900 placeholder:text-gray-400 shadow-xl shadow-gray-200/50"
        />
        <HugeiconsIcon
          icon={Search01Icon}
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
        />

        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * usePagination Hook
 * 
 * Manages pagination state in URL query parameters with navigation functions,
 * validation, debouncing, and localStorage persistence.
 */

import { useCallback, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export interface PaginationParams {
  page: number;
  pageSize: number;
  totalItems: number;
}

export interface PaginationResult {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startIndex: number;
  endIndex: number;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  setPageSize: (size: number) => void;
}

const PAGE_SIZE_KEY = "admin_pagination_page_size";
const DEFAULT_PAGE_SIZE = 24;

/**
 * Custom hook for managing pagination state with URL synchronization
 */
export function usePagination(params: PaginationParams): PaginationResult {
  const { page, pageSize, totalItems } = params;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Calculate derived values
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  // Persist page size to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(PAGE_SIZE_KEY, pageSize.toString());
    }
  }, [pageSize]);

  /**
   * Update URL with new pagination parameters
   */
  const updateURL = useCallback(
    (newPage: number, newPageSize?: number) => {
      const params = new URLSearchParams(searchParams.toString());
      
      // Update page parameter
      if (newPage === 1) {
        params.delete("page");
      } else {
        params.set("page", newPage.toString());
      }

      // Update page size parameter if provided
      if (newPageSize !== undefined) {
        if (newPageSize === DEFAULT_PAGE_SIZE) {
          params.delete("pageSize");
        } else {
          params.set("pageSize", newPageSize.toString());
        }
      }

      // Build new URL
      const queryString = params.toString();
      const newURL = queryString ? `${pathname}?${queryString}` : pathname;

      // Navigate to new URL (debounced by Next.js router)
      router.push(newURL, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  /**
   * Navigate to a specific page
   */
  const goToPage = useCallback(
    (targetPage: number) => {
      // Validate page number
      const validPage = Math.min(Math.max(1, targetPage), totalPages);
      
      if (validPage !== currentPage) {
        updateURL(validPage);
      }
    },
    [currentPage, totalPages, updateURL]
  );

  /**
   * Navigate to the next page
   */
  const goToNextPage = useCallback(() => {
    if (hasNextPage) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, hasNextPage, goToPage]);

  /**
   * Navigate to the previous page
   */
  const goToPreviousPage = useCallback(() => {
    if (hasPreviousPage) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, hasPreviousPage, goToPage]);

  /**
   * Navigate to the first page
   */
  const goToFirstPage = useCallback(() => {
    if (currentPage !== 1) {
      goToPage(1);
    }
  }, [currentPage, goToPage]);

  /**
   * Navigate to the last page
   */
  const goToLastPage = useCallback(() => {
    if (currentPage !== totalPages) {
      goToPage(totalPages);
    }
  }, [currentPage, totalPages, goToPage]);

  /**
   * Change the page size and reset to page 1
   */
  const setPageSize = useCallback(
    (newPageSize: number) => {
      if (newPageSize !== pageSize) {
        // Reset to page 1 when changing page size
        updateURL(1, newPageSize);
      }
    },
    [pageSize, updateURL]
  );

  return {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    hasNextPage,
    hasPreviousPage,
    startIndex,
    endIndex,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    setPageSize,
  };
}

/**
 * Get pagination parameters from URL search params
 */
export function getPaginationFromURL(searchParams: URLSearchParams): {
  page: number;
  pageSize: number;
} {
  const pageParam = searchParams.get("page");
  const pageSizeParam = searchParams.get("pageSize");

  // Get page from URL or default to 1
  const page = pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1;

  // Get page size from URL, localStorage, or default
  let pageSize = DEFAULT_PAGE_SIZE;
  
  if (pageSizeParam) {
    pageSize = parseInt(pageSizeParam, 10);
  } else if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(PAGE_SIZE_KEY);
      if (stored) {
        pageSize = parseInt(stored, 10);
      }
    } catch {
      // Ignore localStorage read errors
    }
  }

  // Validate page size (must be one of the allowed values)
  const allowedPageSizes = [12, 24, 50, 100];
  if (!allowedPageSizes.includes(pageSize)) {
    pageSize = DEFAULT_PAGE_SIZE;
  }

  return { page, pageSize };
}

/**
 * Encode pagination state to URL query parameters
 */
export function encodePaginationToURL(state: {
  page: number;
  pageSize: number;
  search?: string;
  categoryId?: string;
  status?: string;
  [key: string]: string | number | undefined;
}): string {
  const params = new URLSearchParams();

  // Add page (skip if page 1)
  if (state.page > 1) {
    params.set("page", state.page.toString());
  }

  // Add page size (skip if default)
  if (state.pageSize !== DEFAULT_PAGE_SIZE) {
    params.set("pageSize", state.pageSize.toString());
  }

  // Add other parameters
  Object.entries(state).forEach(([key, value]) => {
    if (
      key !== "page" &&
      key !== "pageSize" &&
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      params.set(key, String(value));
    }
  });

  return params.toString();
}

/**
 * Decode pagination state from URL query string
 */
export function decodePaginationFromURL(url: string): {
  page: number;
  pageSize: number;
  [key: string]: string | number;
} {
  const params = new URLSearchParams(url);
  const paginationParams = getPaginationFromURL(params);
  const result: {
    page: number;
    pageSize: number;
    [key: string]: string | number;
  } = {
    page: paginationParams.page,
    pageSize: paginationParams.pageSize,
  };

  // Extract all other parameters
  params.forEach((value, key) => {
    if (key !== "page" && key !== "pageSize") {
      result[key] = value;
    }
  });

  return result;
}

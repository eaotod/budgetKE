/**
 * File-based categories (content/categories.yaml).
 * Single source of truth; no DB reads for storefront.
 */

import fs from "fs";
import path from "path";
import YAML from "yaml";
import type { Category } from "@/lib/types";

const CATEGORIES_PATH = path.join(process.cwd(), "content/categories.yaml");

function loadCategoriesRaw(): Record<string, unknown>[] {
  const fullPath = CATEGORIES_PATH;
  if (!fs.existsSync(fullPath)) return [];
  const content = fs.readFileSync(fullPath, "utf8");
  const parsed = YAML.parse(content);
  return Array.isArray(parsed) ? parsed : [];
}

function rowToCategory(row: Record<string, unknown>, index: number): Category {
  const id = (row.id as string) ?? String(index);
  return {
    id,
    name: (row.name as string) ?? "",
    slug: (row.slug as string) ?? id,
    description: row.description as string | undefined,
    imageUrl: row.imageUrl as string | undefined,
    icon: row.icon as string | undefined,
    displayOrder: typeof row.displayOrder === "number" ? row.displayOrder : index,
    productCount: 0, // Computed when needed from products
    metaTitle: row.metaTitle as string | undefined,
    metaDescription: row.metaDescription as string | undefined,
  };
}

let cached: Category[] | null = null;

export function getCategories(): Category[] {
  if (cached) return cached;
  const rows = loadCategoriesRaw();
  cached = rows.map(rowToCategory).sort((a, b) => a.displayOrder - b.displayOrder);
  return cached;
}

export function getCategoryBySlug(slug: string): Category | null {
  return getCategories().find((c) => c.slug === slug) ?? null;
}

export function getCategoryById(id: string): Category | null {
  return getCategories().find((c) => c.id === id) ?? null;
}

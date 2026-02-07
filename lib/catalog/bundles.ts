/**
 * File-based bundles (content/bundles.yaml).
 * productIds reference product slugs from content/products.
 */

import fs from "fs";
import path from "path";
import YAML from "yaml";
import type { Bundle } from "@/lib/types";
import type { Product } from "@/lib/types";
import { getProductBySlug } from "./products";

const BUNDLES_PATH = path.join(process.cwd(), "content/bundles.yaml");

function loadBundlesRaw(): Record<string, unknown>[] {
  if (!fs.existsSync(BUNDLES_PATH)) return [];
  const content = fs.readFileSync(BUNDLES_PATH, "utf8");
  const parsed = YAML.parse(content);
  return Array.isArray(parsed) ? parsed : [];
}

function rowToBundle(row: Record<string, unknown>): Bundle {
  const id = (row.id as string) ?? "";
  const productIds = (row.productIds as string[]) ?? [];
  const originalPrice = (row.originalPrice as number) ?? 0;
  const bundlePrice = (row.bundlePrice as number) ?? 0;
  return {
    id,
    name: (row.name as string) ?? "",
    slug: (row.slug as string) ?? id,
    description: (row.description as string) ?? "",
    shortDescription: (row.shortDescription as string) ?? undefined,
    productIds,
    products: undefined,
    originalPrice,
    bundlePrice,
    savings: originalPrice - bundlePrice,
    images: [],
    thumbnailUrl: undefined,
    isFeatured: (row.isFeatured as boolean) ?? false,
    status: (row.status as "active" | "draft" | "archived") ?? "active",
    metaTitle: (row.metaTitle as string) ?? undefined,
    metaDescription: (row.metaDescription as string) ?? undefined,
  };
}

let cached: Bundle[] | null = null;

export function getBundles(opts?: { status?: "active" | "draft" | "archived" }): Bundle[] {
  if (cached) {
    const list = opts?.status ? cached.filter((b) => b.status === opts.status) : cached;
    return list;
  }
  const rows = loadBundlesRaw();
  cached = rows.map(rowToBundle);
  const list = opts?.status ? cached.filter((b) => b.status === opts.status) : cached;
  return list;
}

export function getBundleBySlug(slug: string): Bundle | null {
  return getBundles().find((b) => b.slug === slug) ?? null;
}

export function getBundleById(id: string): Bundle | null {
  return getBundles().find((b) => b.id === id) ?? null;
}

/** Resolve bundle with products populated (for product pages and checkout). */
export function getBundleWithProducts(slug: string): Bundle | null {
  const bundle = getBundleBySlug(slug);
  if (!bundle) return null;
  const products: Product[] = [];
  for (const slugId of bundle.productIds) {
    const p = getProductBySlug(slugId);
    if (p) products.push(p);
  }
  return { ...bundle, products };
}

/** Expand bundle to product slugs for order line items (one download per product). */
export function getBundleProductSlugs(bundleSlug: string): string[] {
  const bundle = getBundleBySlug(bundleSlug);
  return bundle?.productIds ?? [];
}

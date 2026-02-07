/**
 * File-based products (content/products/*.mdx).
 * Frontmatter drives product data; body is optional long-form content.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Product } from "@/lib/types";
import type { Category } from "@/lib/types";
import { getCategoryById } from "./categories";

const PRODUCTS_DIR = path.join(process.cwd(), "content/products");

export interface ProductFrontmatter {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  productType: "template" | "advanced_solution";
  price: number;
  comparePrice?: number;
  shortDescription: string;
  description: string;
  features?: string[];
  whatsIncluded?: string[];
  requirements?: string[];
  technicalDetails?: Record<string, string>;
  videoUrl?: string;
  rating?: number;
  reviewCount?: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  status?: "active" | "draft" | "archived";
  /** Storage path for delivery (e.g. products/files/budget-master-pro.zip) */
  filePath: string;
  fileName?: string;
  fileSize?: string;
  fileFormat?: string;
  /** Main image path (e.g. /images/products/budget-master-pro.webp) */
  image?: string;
  images?: string[];
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

function frontmatterToProduct(
  data: ProductFrontmatter,
  category?: Category | null,
): Product {
  const images = Array.isArray(data.images) && data.images.length > 0
    ? data.images
    : data.image
      ? [data.image]
      : [];
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    categoryId: data.categoryId,
    category: category ?? undefined,
    price: data.price,
    comparePrice: data.comparePrice,
    currency: "KES",
    productType: data.productType,
    shortDescription: data.shortDescription,
    description: data.description,
    features: data.features ?? [],
    whatsIncluded: data.whatsIncluded ?? [],
    requirements: data.requirements ?? [],
    technicalDetails: data.technicalDetails ?? {},
    whatYouGet: [],
    detailsSpecs: [],
    images,
    thumbnailUrl: images[0],
    videoUrl: data.videoUrl,
    videoThumbnail: undefined,
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    keywords: data.keywords,
    rating: data.rating ?? 0,
    reviewCount: data.reviewCount ?? 0,
    downloadCount: 0,
    isFeatured: data.isFeatured ?? false,
    isBestseller: data.isBestseller ?? false,
    isNew: data.isNew ?? false,
    status: data.status ?? "active",
    fileUrl: data.filePath,
    fileName: data.fileName,
    fileSize: data.fileSize,
    fileFormat: data.fileFormat,
  };
}

export function getProductSlugs(): string[] {
  if (!fs.existsSync(PRODUCTS_DIR)) return [];
  return fs
    .readdirSync(PRODUCTS_DIR)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}

export function getProductBySlug(slug: string): Product | null {
  const fullPath = path.join(PRODUCTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(raw);
  const category = getCategoryById((data as ProductFrontmatter).categoryId);
  return frontmatterToProduct(data as ProductFrontmatter, category);
}

/** Resolve by product id (e.g. for reviews or legacy order items). */
export function getProductById(id: string): Product | null {
  const slugs = getProductSlugs();
  for (const slug of slugs) {
    const p = getProductBySlug(slug);
    if (p && p.id === id) return p;
  }
  return null;
}

/** Resolve by slug or id (for download API and flexible lookups). */
export function getProductBySlugOrId(slugOrId: string): Product | null {
  return getProductBySlug(slugOrId) ?? getProductById(slugOrId);
}

export function getProducts(opts?: {
  categoryId?: string;
  status?: "active" | "draft" | "archived";
  featured?: boolean;
}): Product[] {
  const slugs = getProductSlugs();
  const products: Product[] = [];
  for (const slug of slugs) {
    const p = getProductBySlug(slug);
    if (!p) continue;
    if (opts?.status && p.status !== opts.status) continue;
    if (opts?.categoryId && p.categoryId !== opts.categoryId) continue;
    if (opts?.featured === true && !p.isFeatured) continue;
    products.push(p);
  }
  return products;
}

export function getProductsByCategory(categoryId: string): Product[] {
  return getProducts({ categoryId, status: "active" });
}

export function getFeaturedProducts(limit?: number): Product[] {
  const list = getProducts({ status: "active", featured: true });
  return limit ? list.slice(0, limit) : list;
}

/** For download API: resolve file path by product slug or id */
export function getProductFilePath(slugOrId: string): string | null {
  const product = getProductBySlugOrId(slugOrId);
  return product?.fileUrl ?? null;
}

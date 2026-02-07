/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Supabase → TypeScript mappers
 *
 * Centralizes the conversion of snake_case database columns
 * to camelCase TypeScript interfaces.
 */

import type { Product, Bundle, Category, Review } from "./types";
import { getPublicUrl } from "./supabase/storage";

function normalizeStringArray(input: any): string[] {
  if (!input) return [];
  if (Array.isArray(input)) return input;
  if (typeof input === "string") {
    const trimmed = input.trim();
    if (trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [input];
      }
    }
    return [input];
  }
  return [];
}

/**
 * Convert image paths to full public URLs
 * If the URL already starts with http/https, return as-is
 * Otherwise, treat it as a storage path and get the public URL
 */
function normalizeImageUrls(input: any): string[] {
  const urls = normalizeStringArray(input);
  return urls.map((url) => {
    if (!url) return url;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return getPublicUrl(url);
  });
}

function filterTechnicalDetails(
  productType: "template" | "advanced_solution",
  input: any,
): Record<string, string> {
  const details =
    input && typeof input === "object" && !Array.isArray(input) ? input : {};

  const allowedKeys =
    productType === "advanced_solution"
      ? (["technology_stack", "platform", "deployment_type"] as const)
      : (["excel_version", "file_format", "compatibility"] as const);

  const out: Record<string, string> = {};
  for (const key of allowedKeys) {
    const value = details[key];
    if (typeof value === "string" && value.trim()) {
      out[key] = value.trim();
    }
  }
  return out;
}

// ============================================
// PRODUCT MAPPER
// ============================================

/**
 * Maps a Supabase product row to the Product interface
 */
export function mapProduct(p: Record<string, any>): Product {
  const productType = (p.product_type ?? "template") as
    | "template"
    | "advanced_solution";

  const mappedImages = normalizeImageUrls(p.images);

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    categoryId: p.category_id,
    category: p.categories ? mapCategory(p.categories) : undefined,
    price: p.price,
    comparePrice: p.compare_price,
    currency: p.currency ?? "KES",
    productType,
    shortDescription: p.short_description ?? "",
    description: p.description ?? "",
    features: p.features ?? [],
    whatsIncluded: p.whats_included ?? [],
    requirements: p.requirements ?? [],
    technicalDetails: filterTechnicalDetails(productType, p.technical_details),
    // Legacy fields for backward compatibility
    whatYouGet: p.what_you_get ?? [],
    detailsSpecs: p.details_specs ?? [],
    whyItWorks: p.why_it_works,
    howToUse: p.how_to_use,
    images: mappedImages, // Convert paths to full URLs
    thumbnailUrl: p.thumbnail_url && !p.thumbnail_url.startsWith('http') 
      ? getPublicUrl(p.thumbnail_url) 
      : p.thumbnail_url,
    videoUrl: p.video_url,
    videoThumbnail: p.video_thumbnail && !p.video_thumbnail.startsWith('http')
      ? getPublicUrl(p.video_thumbnail)
      : p.video_thumbnail,
    metaTitle: p.meta_title,
    metaDescription: p.meta_description,
    keywords: p.keywords,
    rating: p.rating ?? 0,
    reviewCount: p.review_count ?? 0,
    downloadCount: p.download_count ?? 0,
    isFeatured: p.is_featured ?? false,
    isBestseller: p.is_bestseller ?? false,
    isNew: p.is_new ?? false,
    status: p.status ?? "draft",
    fileUrl: p.file_url ?? "",
    fileName: p.file_name,
    fileSize: p.file_size,
    fileFormat: p.file_format,
  };
}

/**
 * Maps an array of Supabase product rows
 */
export function mapProducts(rows: Record<string, any>[]): Product[] {
  return rows.map(mapProduct);
}

// ============================================
// CATEGORY MAPPER
// ============================================

/**
 * Maps a Supabase category row to the Category interface
 */
export function mapCategory(c: Record<string, any>): Category {
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    imageUrl: c.image_url,
    icon: c.icon,
    parentId: c.parent_id,
    displayOrder: c.display_order ?? 0,
    productCount: c.product_count ?? 0,
    metaTitle: c.meta_title,
    metaDescription: c.meta_description,
  };
}

/**
 * Maps an array of Supabase category rows
 */
export function mapCategories(rows: Record<string, any>[]): Category[] {
  return rows.map(mapCategory);
}

// ============================================
// BUNDLE MAPPER
// ============================================

/**
 * Maps a Supabase bundle row to the Bundle interface
 */
export function mapBundle(b: Record<string, any>): Bundle {
  return {
    id: b.id,
    name: b.name,
    slug: b.slug,
    description: b.description ?? "",
    shortDescription: b.short_description,
    productIds: normalizeStringArray(b.product_ids),
    products: b.products ? mapProducts(b.products) : undefined,
    originalPrice: b.original_price ?? 0,
    bundlePrice: b.bundle_price ?? 0,
    savings: (b.original_price ?? 0) - (b.bundle_price ?? 0),
    images: normalizeImageUrls(b.images), // Convert paths to full URLs
    thumbnailUrl: b.thumbnail_url && !b.thumbnail_url.startsWith('http')
      ? getPublicUrl(b.thumbnail_url)
      : b.thumbnail_url,
    isFeatured: b.is_featured ?? false,
    status: b.status ?? "draft",
    metaTitle: b.meta_title,
    metaDescription: b.meta_description,
  };
}

/**
 * Maps an array of Supabase bundle rows
 */
export function mapBundles(rows: Record<string, any>[]): Bundle[] {
  return rows.map(mapBundle);
}

// ============================================
// REVIEW MAPPER
// ============================================

export function mapReview(r: Record<string, any>): Review {
  return {
    id: r.id,
    productId: r.product_id,
    orderId: r.order_id ?? undefined,
    authorName: r.author_name,
    authorEmail: r.author_email,
    authorAvatar: r.author_avatar ?? undefined,
    authorLocation: r.author_location ?? undefined,
    rating: r.rating,
    title: r.title ?? undefined,
    content: r.content,
    isVerified: r.is_verified ?? false,
    isApproved: r.is_approved ?? false,
    moderationStatus: r.moderation_status ?? undefined,
    isFeatured: r.is_featured ?? false,
    helpfulCount: r.helpful_count ?? 0,
    adminResponse: r.admin_response ?? undefined,
    adminRespondedAt: r.admin_responded_at ?? undefined,
    createdAt: r.created_at,
  };
}

export function mapReviews(rows: Record<string, any>[]): Review[] {
  return rows.map(mapReview);
}

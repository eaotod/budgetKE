/**
 * Supabase → TypeScript mappers
 *
 * Centralizes the conversion of snake_case database columns
 * to camelCase TypeScript interfaces.
 */

import type { Product, Bundle, Category } from "./types";

// ============================================
// PRODUCT MAPPER
// ============================================

/**
 * Maps a Supabase product row to the Product interface
 */
export function mapProduct(p: Record<string, any>): Product {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    categoryId: p.category_id,
    category: p.categories ? mapCategory(p.categories) : undefined,
    price: p.price,
    comparePrice: p.compare_price,
    currency: p.currency ?? "KES",
    shortDescription: p.short_description ?? "",
    description: p.description ?? "",
    whatYouGet: p.what_you_get ?? [],
    detailsSpecs: p.details_specs ?? [],
    whyItWorks: p.why_it_works,
    howToUse: p.how_to_use,
    images: p.images ?? [],
    thumbnailUrl: p.thumbnail_url,
    videoUrl: p.video_url,
    videoThumbnail: p.video_thumbnail,
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
    productIds: b.product_ids ?? [],
    products: b.products ? mapProducts(b.products) : undefined,
    originalPrice: b.original_price ?? 0,
    bundlePrice: b.bundle_price ?? 0,
    savings: (b.original_price ?? 0) - (b.bundle_price ?? 0),
    images: b.images ?? [],
    thumbnailUrl: b.thumbnail_url,
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

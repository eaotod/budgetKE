/**
 * File-based catalog: categories (YAML), products (MDX), bundles (YAML).
 * Single source of truth for storefront; no DB reads for catalog.
 */

export {
  getCategories,
  getCategoryBySlug,
  getCategoryById,
} from "./categories";

export {
  getProductSlugs,
  getProductBySlug,
  getProductById,
  getProductBySlugOrId,
  getProducts,
  getProductsByCategory,
  getFeaturedProducts,
  getProductFilePath,
} from "./products";
export type { ProductFrontmatter } from "./products";

export {
  getBundles,
  getBundleBySlug,
  getBundleById,
  getBundleWithProducts,
  getBundleProductSlugs,
} from "./bundles";

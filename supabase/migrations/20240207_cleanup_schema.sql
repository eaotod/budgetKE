-- ============================================
-- Schema Cleanup Migration
-- Remove unused fields, keep essential ones
-- ============================================

-- Remove unused fields from products table
ALTER TABLE products DROP COLUMN IF EXISTS why_it_works;
ALTER TABLE products DROP COLUMN IF EXISTS how_to_use;
ALTER TABLE products DROP COLUMN IF EXISTS download_count;

-- Keep these fields (no changes needed):
-- - compare_price (for discounts/sales)
-- - video_url (for product demos)
-- - is_new (for "New Arrival" badge)
-- - what_you_get (legacy - for backward compatibility during migration)
-- - details_specs (legacy - for backward compatibility during migration)

-- New fields already added by add_product_type_templates.sql:
-- - product_type
-- - features
-- - whats_included
-- - requirements
-- - technical_details

-- Add comment for clarity
COMMENT ON COLUMN products.what_you_get IS 'LEGACY: Use whats_included array instead. Kept for backward compatibility.';
COMMENT ON COLUMN products.details_specs IS 'LEGACY: Use features/requirements/technical_details instead. Kept for backward compatibility.';

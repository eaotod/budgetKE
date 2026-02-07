-- Remove dynamic content tables we no longer manage in DB:
-- - global_faqs (now static)
-- - product_faqs (now static by product type)
-- - testimonials (now static)
-- - admin_users (admin access is role-based)

-- Update is_admin() to be role-only (no email/admin_users lookup)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  WITH token AS (
    SELECT auth.jwt() AS jwt
  )
  SELECT
    COALESCE((jwt -> 'user_metadata' ->> 'role') = 'admin', FALSE)
  FROM token;
$$ LANGUAGE sql STABLE;

-- Drop unused tables (safe if already gone)
DROP TABLE IF EXISTS global_faqs CASCADE;
DROP TABLE IF EXISTS product_faqs CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;


-- Add moderation_status to reviews for admin workflow
-- States: pending (default), accepted (public), rejected (hidden)

ALTER TABLE reviews
ADD COLUMN IF NOT EXISTS moderation_status TEXT NOT NULL DEFAULT 'pending'
CHECK (moderation_status IN ('pending', 'accepted', 'rejected'));

-- Backfill from legacy is_approved boolean
UPDATE reviews
SET moderation_status = CASE WHEN is_approved = TRUE THEN 'accepted' ELSE 'pending' END
WHERE moderation_status IS NULL OR moderation_status = 'pending';

-- Index for storefront queries
CREATE INDEX IF NOT EXISTS idx_reviews_product_status
ON reviews(product_id, moderation_status);

-- Update (or create) public read policy to use moderation_status
DO $$
BEGIN
  -- Drop legacy policy if it exists (Supabase creates policies as separate objects)
  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'reviews'
      AND policyname = 'Public can view approved reviews'
  ) THEN
    EXECUTE 'DROP POLICY \"Public can view approved reviews\" ON reviews';
  END IF;
EXCEPTION WHEN OTHERS THEN
  -- ignore
END $$;

CREATE POLICY IF NOT EXISTS "Public can view accepted reviews"
  ON reviews
  FOR SELECT
  USING (moderation_status = 'accepted');


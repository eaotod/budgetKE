-- Add product type field to products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS product_type TEXT DEFAULT 'template' 
CHECK (product_type IN ('template', 'advanced_solution'));

-- Add features and requirements arrays
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}';

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS whats_included TEXT[] DEFAULT '{}';

ALTER TABLE products 
ADD COLUMN IF NOT EXISTS requirements TEXT[] DEFAULT '{}';

-- Add technical_details JSONB field for structured technical information
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS technical_details JSONB DEFAULT '{}'::jsonb;

-- Create index on product_type for faster filtering
CREATE INDEX IF NOT EXISTS idx_products_product_type ON products(product_type);

-- Add comment explaining the structure
COMMENT ON COLUMN products.product_type IS 'Type of product: template (Excel + Sheets) or advanced_solution (custom apps)';
COMMENT ON COLUMN products.features IS 'Array of product features (bullet points)';
COMMENT ON COLUMN products.whats_included IS 'Array of what is included with the product (bullet points)';
COMMENT ON COLUMN products.requirements IS 'Array of product requirements (bullet points)';
COMMENT ON COLUMN products.technical_details IS 'Structured technical information based on product type';

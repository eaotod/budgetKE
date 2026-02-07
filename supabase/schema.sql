-- ============================================
-- BudgetKE Professional Database Schema
-- Optimized for Supabase (PostgreSQL)
-- ============================================

-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- 1. CATEGORIES
-- ============================================
CREATE TABLE categories (
    id TEXT PRIMARY KEY, -- Slug-based ID (e.g., 'personal-finance')
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    icon TEXT, -- Lucide/Hugeicons icon name
    parent_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
    display_order INTEGER DEFAULT 0,
    product_count INTEGER DEFAULT 0,
    
    -- SEO Metadata
    meta_title TEXT,
    meta_description TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. PRODUCTS
-- ============================================
CREATE TABLE products (
    id TEXT PRIMARY KEY, -- Unique ID (e.g., 'budget-planner-v1')
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
    
    -- Pricing (Stored in KES)
    price INTEGER NOT NULL, 
    compare_price INTEGER, 
    currency TEXT DEFAULT 'KES',
    
    -- Content
    short_description TEXT,
    description TEXT,
    
    -- Structured Content (JSONB)
    what_you_get JSONB DEFAULT '[]'::jsonb, 
    details_specs JSONB DEFAULT '[]'::jsonb,
    why_it_works TEXT,
    how_to_use TEXT,
    
    -- Media
    images JSONB DEFAULT '[]'::jsonb,
    thumbnail_url TEXT,
    video_url TEXT,
    video_thumbnail TEXT,
    
    -- SEO
    meta_title TEXT,
    meta_description TEXT,
    keywords TEXT[],
    
    -- Stats
    rating NUMERIC(2,1) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    download_count INTEGER DEFAULT 0,
    
    -- Status & Flags
    is_featured BOOLEAN DEFAULT FALSE,
    is_bestseller BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
    
    -- File Management
    file_url TEXT NOT NULL,
    file_name TEXT,
    file_size TEXT,
    file_format TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. PRODUCT FAQS
-- ============================================
CREATE TABLE product_faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. BUNDLES
-- ============================================
CREATE TABLE bundles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT,
    
    -- Array of product IDs included in the bundle
    product_ids TEXT[] NOT NULL,
    
    -- Pricing
    original_price INTEGER,
    bundle_price INTEGER NOT NULL,
    savings INTEGER GENERATED ALWAYS AS (COALESCE(original_price, 0) - bundle_price) STORED,
    
    -- Media
    images JSONB DEFAULT '[]'::jsonb,
    thumbnail_url TEXT,
    
    -- Flags
    is_featured BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
    
    -- SEO
    meta_title TEXT,
    meta_description TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. ORDERS
-- ============================================
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    
    -- Customer Information
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    customer_name TEXT,
    
    -- Order Content (Snapshot for record keeping)
    items JSONB NOT NULL,
    
    -- Financials
    subtotal INTEGER NOT NULL,
    discount INTEGER DEFAULT 0,
    total INTEGER NOT NULL,
    currency TEXT DEFAULT 'KES',
    
    -- Payment Tracking
    payment_method TEXT DEFAULT 'mpesa' CHECK (payment_method IN ('mpesa', 'card', 'paypal')),
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
    payment_ref TEXT, -- M-Pesa Transaction Code
    intasend_invoice_id TEXT,
    intasend_checkout_id TEXT,
    
    -- Access Control
    download_token TEXT UNIQUE,
    download_count INTEGER DEFAULT 0,
    max_downloads INTEGER DEFAULT 5,
    
    -- Metadata
    ip_address TEXT,
    user_agent TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    paid_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days')
);

-- ============================================
-- 6. REVIEWS
-- ============================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    
    author_name TEXT NOT NULL,
    author_email TEXT NOT NULL,
    author_avatar TEXT,
    author_location TEXT,
    
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    content TEXT NOT NULL,
    
    -- Moderation
    is_verified BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    moderation_status TEXT NOT NULL DEFAULT 'pending' CHECK (moderation_status IN ('pending','accepted','rejected')),
    is_featured BOOLEAN DEFAULT FALSE,
    helpful_count INTEGER DEFAULT 0,
    
    admin_response TEXT,
    admin_responded_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. COMMUNICATIONS
-- ============================================
CREATE TABLE newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    source TEXT DEFAULT 'website',
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    unsubscribed_at TIMESTAMPTZ
);

CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    is_resolved BOOLEAN DEFAULT FALSE,
    response TEXT,
    responded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 9. LOGGING
-- ============================================
CREATE TABLE download_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    downloaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PERFORMANCE INDEXES
-- ============================================

-- Fast lookup for slugs (Primary way users access products/categories)
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_bundles_slug ON bundles(slug);

-- Optimized filtering for storefront
CREATE INDEX idx_products_status_featured ON products(status, is_featured) WHERE status = 'active';
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_reviews_product_status ON reviews(product_id, moderation_status);

-- Transactional lookups
CREATE INDEX idx_orders_email ON orders(email);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_token ON orders(download_token) WHERE download_token IS NOT NULL;
CREATE INDEX idx_orders_payment_status ON orders(payment_status);

-- Content organization
CREATE INDEX idx_category_parent ON categories(parent_id);

-- ============================================
-- TRIGGERS & FUNCTIONS
-- ============================================

-- Function: Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Attach update triggers
CREATE TRIGGER tr_update_products_timestamp BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER tr_update_categories_timestamp BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER tr_update_bundles_timestamp BEFORE UPDATE ON bundles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER tr_update_reviews_timestamp BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function: Admin check (role-based only)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  WITH token AS (
    SELECT auth.jwt() AS jwt
  )
  SELECT
    COALESCE((jwt -> 'user_metadata' ->> 'role') = 'admin', FALSE)
  FROM token;
$$ LANGUAGE sql STABLE;

-- Function: Generate a unique, professional order number
-- Format: BK-YYYYMMDD-XXXX (where XXXX is random uppercase)
CREATE OR REPLACE FUNCTION generate_budgetke_order_number()
RETURNS TRIGGER AS $$
DECLARE
    new_order_no TEXT;
    is_unique BOOLEAN := FALSE;
BEGIN
    WHILE NOT is_unique LOOP
        new_order_no := 'BK-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 4));
        SELECT NOT EXISTS (SELECT 1 FROM orders WHERE order_number = new_order_no) INTO is_unique;
    END LOOP;
    NEW.order_number := new_order_no;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_generate_order_number BEFORE INSERT ON orders FOR EACH ROW WHEN (NEW.order_number IS NULL) EXECUTE FUNCTION generate_budgetke_order_number();

-- Function: Generate download token and update paid_at when payment is completed
CREATE OR REPLACE FUNCTION handle_order_payment_completion()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.payment_status = 'completed' AND (OLD.payment_status IS NULL OR OLD.payment_status != 'completed') THEN
        IF NEW.download_token IS NULL THEN
            NEW.download_token := ENCODE(GEN_RANDOM_BYTES(24), 'hex');
        END IF;
        NEW.paid_at := NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_handle_payment_completion BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION handle_order_payment_completion();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE bundles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_logs ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
CREATE POLICY "Public can view active categories" ON categories FOR SELECT USING (TRUE);
CREATE POLICY "Public can view active products" ON products FOR SELECT USING (status = 'active');
CREATE POLICY "Public can view active bundles" ON bundles FOR SELECT USING (status = 'active');
CREATE POLICY "Public can view accepted reviews" ON reviews FOR SELECT USING (moderation_status = 'accepted');

-- TRANSACTIONAL POLICIES (No Auth required for initial checkout)
CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public can view their own order by token" ON orders FOR SELECT USING (download_token IS NOT NULL);
CREATE POLICY "Anyone can submit reviews" ON reviews FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Anyone can send contact messages" ON contact_messages FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "System can log downloads" ON download_logs FOR INSERT WITH CHECK (TRUE);

-- ADMIN ACCESS POLICIES
CREATE POLICY "Admin can manage categories" ON categories
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin can manage products" ON products
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin can manage bundles" ON bundles
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin can manage orders" ON orders
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin can manage reviews" ON reviews
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin can manage newsletter_subscribers" ON newsletter_subscribers
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin can manage contact_messages" ON contact_messages
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY "Admin can manage download_logs" ON download_logs
  FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- CUSTOMER ACCESS POLICIES
CREATE POLICY "Customers can view their orders" ON orders
  FOR SELECT USING (email = auth.jwt() ->> 'email');

-- STORAGE POLICIES (Supabase Storage)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view product images" ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'budgetke'
    AND name LIKE 'products/images/%'
  );

CREATE POLICY "Admin can manage storage" ON storage.objects
  FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

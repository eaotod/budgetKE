-- Remove services table and related policies
-- Services are now static data in lib/data.ts

-- Drop RLS policies for services
DROP POLICY IF EXISTS "Public can view active services" ON services;
DROP POLICY IF EXISTS "Admin can manage services" ON services;

-- Drop the services table
DROP TABLE IF EXISTS services CASCADE;

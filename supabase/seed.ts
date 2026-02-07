import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import path from "path";
import { seedCategories, seedProducts, seedBundles } from "./seed-data";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY",
  );
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function seed() {
  console.log("🌱 Starting seed...");

  // 1. Clear existing data (in reverse order of dependencies)
  console.log("🗑️  Clearing existing data...");
  
  await supabase.from("bundles").delete().neq("id", "none");
  await supabase.from("products").delete().neq("id", "none");
  await supabase.from("categories").delete().neq("id", "none");

  // 2. Insert Categories
  console.log("📁 Seeding categories...");
  const { error: catError } = await supabase.from("categories").insert(
    seedCategories.map(c => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      icon: c.icon,
      display_order: c.displayOrder,
      product_count: c.productCount,
      meta_title: c.metaTitle,
      meta_description: c.metaDescription
    }))
  );
  if (catError) throw catError;
  console.log(`✅ Seeded ${seedCategories.length} categories`);

  // 3. Insert Products
  console.log("📦 Seeding products...");
  const { error: prodError } = await supabase.from("products").insert(
    seedProducts.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category_id: p.categoryId,
      product_type: p.productType,
      price: p.price,
      compare_price: p.comparePrice,
      currency: "KES",
      short_description: p.shortDescription,
      description: p.description,
      features: p.features,
      whats_included: p.whatsIncluded,
      requirements: p.requirements,
      technical_details: p.technicalDetails,
      video_url: p.videoUrl,
      meta_title: `${p.name} | BudgetKE`,
      meta_description: p.shortDescription,
      keywords: [p.name.toLowerCase(), p.categoryId],
      rating: p.rating,
      review_count: p.reviewCount,
      is_featured: p.isFeatured,
      is_bestseller: p.isBestseller,
      is_new: p.isNew,
      status: p.status,
      file_url: p.fileUrl,
      file_name: p.fileName,
      file_size: p.fileSize,
      file_format: p.fileFormat
    }))
  );
  if (prodError) throw prodError;
  console.log(`✅ Seeded ${seedProducts.length} products`);

  // 4. Insert Bundles
  console.log("🎁 Seeding bundles...");
  const { error: bundleError } = await supabase.from("bundles").insert(
    seedBundles.map(b => ({
      id: b.id,
      name: b.name,
      slug: b.slug,
      description: b.description,
      short_description: b.shortDescription,
      product_ids: b.productIds,
      original_price: b.originalPrice,
      bundle_price: b.bundlePrice,
      images: [],
      is_featured: b.isFeatured,
      status: b.status,
      meta_title: b.metaTitle,
      meta_description: b.metaDescription
    }))
  );
  if (bundleError) throw bundleError;
  console.log(`✅ Seeded ${seedBundles.length} bundles`);

  console.log("🎉 Seeding complete!");
  console.log(`
📊 Summary:
  - ${seedCategories.length} categories
  - ${seedProducts.length} products
  - ${seedBundles.length} bundles
  `);
}

seed()
  .then(() => {
    console.log("✅ Seed completed successfully");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });

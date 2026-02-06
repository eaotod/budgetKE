import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import path from "path";
import { testimonials, globalFaqs } from "../lib/data";
import { allSeedProducts } from "./seed-products";
import { seedBundles, seedReviews } from "./seed-bundles-reviews";
import { seedCategories, services } from "./seed-services";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("❌ Missing SUPABASE environment variables in .env");
  console.log("Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function seed() {
  console.log("🚀 Starting database seeding...");

  // 1. Clear existing data (in reverse order of dependencies)
  console.log("🧹 Clearing existing tables...");
  
  // Use a non-existent UUID or a simple delete-all if RLS is bypassed
  const { error: delFaqErr } = await supabase.from("product_faqs").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error: delTestErr } = await supabase.from("testimonials").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error: delGFaqErr } = await supabase.from("global_faqs").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error: delBundleErr } = await supabase.from("bundles").delete().neq("id", "none");
  const { error: delProdErr } = await supabase.from("products").delete().neq("id", "none");
  const { error: delCatErr } = await supabase.from("categories").delete().neq("id", "none");
  const { error: delServicesErr } = await supabase.from("services").delete().neq("id", "none");

  if (delCatErr) console.warn("Note: Error while clearing categories (might be empty):", delCatErr.message);

  // 2. Insert Categories
  console.log("📦 Inserting categories...");
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

  // 3. Insert Services
  console.log("🛠️ Inserting services...");
  const { error: servicesError } = await supabase.from("services").insert(
    services.map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      tier: s.tier,
      price_min: s.priceMin,
      price_max: s.priceMax,
      currency: s.currency,
      timeline: s.timeline,
      short_description: s.shortDescription,
      description: s.description,
      features: s.features,
      deliverables: s.deliverables,
      status: s.status,
    })),
  );
  if (servicesError) {
    console.warn(
      "Note: services not seeded (missing table). Apply schema/migrations, then re-run seed.",
      servicesError.message,
    );
  }

  // 3. Insert Products
  console.log("🛒 Inserting products...");
  const { error: prodError } = await supabase.from("products").insert(
    allSeedProducts.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category_id: p.categoryId,
      price: p.price,
      compare_price: p.comparePrice,
      currency: p.currency,
      short_description: p.shortDescription,
      description: p.description,
      what_you_get: p.whatYouGet,
      details_specs: p.detailsSpecs,
      why_it_works: p.whyItWorks,
      how_to_use: p.howToUse,
      images: p.images,
      thumbnail_url: p.thumbnailUrl,
      video_url: p.videoUrl,
      video_thumbnail: p.videoThumbnail,
      meta_title: p.metaTitle,
      meta_description: p.metaDescription,
      keywords: p.keywords,
      rating: p.rating,
      review_count: p.reviewCount,
      download_count: p.downloadCount,
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

  // 4. Insert Bundles
  console.log("🎁 Inserting bundles...");
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
      images: b.images,
      thumbnail_url: b.thumbnailUrl,
      is_featured: b.isFeatured,
      status: b.status,
      meta_title: b.metaTitle,
      meta_description: b.metaDescription
    }))
  );
  if (bundleError) throw bundleError;

  // 5. Insert Reviews (seeded as approved)
  console.log("⭐ Inserting reviews...");
  const reviewPayload = seedReviews.map((r) => ({
    product_id: r.productId,
    order_id: null,
    author_name: r.authorName,
    author_email: r.authorEmail,
    author_avatar: r.authorAvatar,
    author_location: r.authorLocation,
    rating: r.rating,
    title: r.title,
    content: r.content,
    is_verified: r.isVerified,
    is_approved: true,
    is_featured: r.isFeatured,
    helpful_count: r.helpfulCount,
    admin_response: r.adminResponse,
    admin_responded_at: r.adminRespondedAt,
    created_at: r.createdAt,
  }));
  const { error: reviewError } = await supabase.from("reviews").insert(reviewPayload);
  if (reviewError) throw reviewError;

  // 6. Insert Testimonials
  console.log("💬 Inserting testimonials...");
  const { error: testError } = await supabase.from("testimonials").insert(
    testimonials.map(t => ({
      author_name: t.authorName,
      author_title: t.authorTitle,
      author_company: t.authorCompany,
      author_location: t.authorLocation,
      author_avatar: t.authorAvatar,
      content: t.content,
      short_quote: t.shortQuote,
      video_url: t.videoUrl,
      video_thumbnail: t.videoThumbnail,
      rating: t.rating,
      is_featured: t.isFeatured,
      display_order: t.displayOrder
    }))
  );
  if (testError) throw testError;

  // 7. Insert Global FAQs
  console.log("❓ Inserting global FAQs...");
  const { error: faqError } = await supabase.from("global_faqs").insert(
    globalFaqs.map(f => ({
      category: f.category,
      question: f.question,
      answer: f.answer,
      display_order: f.displayOrder,
      is_featured: f.isFeatured
    }))
  );
  if (faqError) throw faqError;

  console.log("✅ Seeding completed successfully!");
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});

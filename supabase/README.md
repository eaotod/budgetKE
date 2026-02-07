# BudgetKE Database Seeding

## Overview

Clean, minimal seed data for BudgetKE with:
- **4 Categories**: Personal Finance, Business Tools, Industry Specific, Advanced Solutions
- **12 Products**: 3 per category (templates + PWAs/VBA/Desktop apps)
- **3 Bundles**: Personal Finance, Business Starter, Industry Pro

## Quick Start

### 1. Run Migrations

```bash
# Apply schema cleanup (removes unused fields)
supabase db push
```

### 2. Seed Database

```bash
# Seed categories, products, and bundles
npm run db:seed
```

## What Gets Seeded

### Categories (4)
1. **Personal Finance** - Budget trackers, savings planners
2. **Business Tools** - Bookkeeping, inventory, invoicing
3. **Industry Specific** - Mtumba, hotels, property management
4. **Advanced Solutions** - PWAs, VBA apps, desktop software

### Products (12)

**Personal Finance (3):**
- Budget Master Pro (KES 699) - Featured, Bestseller
- Chamaa Manager (KES 999) - Featured, Bestseller
- Expense Tracker Deluxe (KES 699) - New

**Business Tools (3):**
- Small Business Bookkeeper (KES 999) - Featured
- Inventory Manager Basic (KES 999)
- Invoice & Quote Generator (KES 899) - Bestseller

**Industry Specific (3):**
- Mtumba Business Tracker (KES 1,799) - Featured, Bestseller
- Hotel Management Suite (KES 2,499) - Featured
- Landlord & Property Manager (KES 2,199) - Bestseller

**Advanced Solutions (3):**
- PWA Budget Master (KES 2,999) - Featured, New
- VBA Inventory Pro (KES 4,999) - New
- Desktop POS System (KES 9,999) - Featured, New

### Bundles (3)
1. **Personal Finance Bundle** (KES 1,699) - Save 32%
2. **Business Starter Bundle** (KES 1,999) - Save 30%
3. **Industry Pro Bundle** (KES 4,299) - Save 35%

## Schema Changes

### Removed Fields
- ❌ `why_it_works` - Never used
- ❌ `how_to_use` - Never used
- ❌ `download_count` - Tracked in download_logs instead

### Kept Fields
- ✅ `compare_price` - For discounts/sales
- ✅ `video_url` - For product demos
- ✅ `is_new` - For "New Arrival" badge

### New Fields (Product Type Templates)
- ✅ `product_type` - "template" or "advanced_solution"
- ✅ `features` - Array of feature strings
- ✅ `whats_included` - Array of what's included items
- ✅ `requirements` - Array of requirement strings
- ✅ `technical_details` - JSONB with structured tech info

### Legacy Fields (Kept for Migration)
- `what_you_get` - Use `whats_included` instead
- `details_specs` - Use `features`/`requirements`/`technical_details` instead

## File Structure

```
supabase/
├── migrations/
│   ├── add_product_type_templates.sql  # Adds new template fields
│   └── 20240207_cleanup_schema.sql     # Removes unused fields
├── seed-data.ts                         # All seed data (categories, products, bundles)
├── seed.ts                              # Seed script
└── README.md                            # This file
```

## Notes

- No admin user seeded (handle authentication separately)
- No reviews seeded (will be added by real users)
- All products have `status: "active"` and are visible immediately
- Video URLs are placeholders - update with real YouTube links
- File URLs point to Supabase storage - upload actual files separately

## Troubleshooting

**Error: "Missing environment variables"**
- Make sure `.env` has `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

**Error: "Row-level security policy"**
- Seed script uses service role key which bypasses RLS
- If still failing, check RLS policies in Supabase dashboard

**Error: "Foreign key constraint"**
- Seed script clears data in correct order (bundles → products → categories)
- If still failing, manually clear tables in Supabase dashboard first

## Development

To modify seed data, edit `supabase/seed-data.ts`:
- Add/remove categories in `seedCategories`
- Add/remove products in `seedProducts`
- Add/remove bundles in `seedBundles`

Then run `npm run db:seed` to apply changes.

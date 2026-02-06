// ============================================
// BudgetKE Seed Data - Bundles & Reviews
// ============================================

import type { Bundle, Review } from "../lib/types";

// Bundles
export const seedBundles: Bundle[] = [
  {
    id: "personal-finance-bundle",
    name: "Personal Finance Complete Bundle",
    slug: "personal-finance-bundle",
    description: "All 5 personal finance tools: Budget Master Pro, Debt Destroyer, Savings Planner, Expense Tracker, and Chamaa Manager. Save over KES 1,500!",
    shortDescription: "Everything you need to master your personal finances. Save 33%!",
    productIds: ["budget-master-pro", "debt-destroyer", "savings-goal-planner", "expense-tracker-deluxe", "chamaa-manager"],
    originalPrice: 3795,
    bundlePrice: 2499,
    savings: 1296,
    images: [],
    thumbnailUrl: "",
    isFeatured: true,
    status: "active",
    metaTitle: "Personal Finance Bundle Kenya | 5 Tools for One Price",
    metaDescription: "Complete personal finance toolkit. Budget, save, track debt, and manage your Chamaa. Save 33%.",
  },
  {
    id: "business-starter-bundle",
    name: "Business Starter Bundle",
    slug: "business-starter-bundle",
    description: "All 5 business tools: Bookkeeper, Profit Tree, Inventory, Invoice Generator, and Freelancer Tracker. Launch your business finances the right way.",
    shortDescription: "Launch your business finances the right way. Save 30%!",
    productIds: ["small-biz-bookkeeper", "profit-tree-tracker", "inventory-basic", "invoice-generator", "freelancer-tracker"],
    originalPrice: 4995,
    bundlePrice: 3499,
    savings: 1496,
    images: [],
    thumbnailUrl: "",
    isFeatured: true,
    status: "active",
    metaTitle: "Business Starter Bundle Kenya | 5 Essential SME Tools",
    metaDescription: "Complete business toolkit for Kenyan SMEs. Bookkeeping, inventory, invoicing, and more. Save 30%.",
  },
  {
    id: "complete-finance-suite",
    name: "Complete Finance Suite",
    slug: "complete-finance-suite",
    description: "All 10 Tier 1 templates plus 30 days priority email support. The ultimate financial management package for individuals and businesses.",
    shortDescription: "All 10 core templates plus priority support. Save 42%!",
    productIds: ["budget-master-pro", "debt-destroyer", "savings-goal-planner", "expense-tracker-deluxe", "chamaa-manager", "small-biz-bookkeeper", "profit-tree-tracker", "inventory-basic", "invoice-generator", "freelancer-tracker"],
    originalPrice: 8790,
    bundlePrice: 4999,
    savings: 3791,
    images: [],
    thumbnailUrl: "",
    isFeatured: true,
    status: "active",
    metaTitle: "Complete Finance Suite Kenya | All 10 Templates",
    metaDescription: "Every financial template you need. Personal and business finance in one bundle. Save 42%.",
  },
  {
    id: "industry-pro-bundle",
    name: "Industry Pro Bundle",
    slug: "industry-pro-bundle",
    description: "Choose any 5 industry-specific templates. Perfect for multi-business owners or those wanting comprehensive coverage.",
    shortDescription: "Pick any 5 industry templates. Save 35%!",
    productIds: [],
    originalPrice: 9995,
    bundlePrice: 5999,
    savings: 3996,
    images: [],
    thumbnailUrl: "",
    isFeatured: false,
    status: "active",
    metaTitle: "Industry Pro Bundle Kenya | Choose 5 Specialized Templates",
    metaDescription: "Pick any 5 industry-specific templates. Hospitality, retail, real estate, and more. Save 35%.",
  },
];

// Realistic Reviews with Kenyan names and locations
export const seedReviews: Review[] = [
  // Budget Master Pro Reviews
  { id: "rev-1", productId: "budget-master-pro", orderId: "ord-1001", authorName: "Grace Wanjiku", authorEmail: "grace.w@email.com", authorLocation: "Nairobi", rating: 5, content: "This budget planner changed my life! I finally know where my M-Pesa money goes. I've saved KES 15,000 in just 2 months.", isVerified: true, isApproved: true, isFeatured: true, helpfulCount: 45, createdAt: "2026-01-15T10:30:00Z" },
  { id: "rev-2", productId: "budget-master-pro", orderId: "ord-1002", authorName: "Peter Ochieng", authorEmail: "peter.o@email.com", authorLocation: "Kisumu", rating: 5, content: "Very easy to use even for someone not tech-savvy. The video tutorial was extremely helpful. Highly recommend!", isVerified: true, isApproved: true, isFeatured: false, helpfulCount: 32, createdAt: "2026-01-18T14:20:00Z" },
  { id: "rev-3", productId: "budget-master-pro", orderId: "ord-1003", authorName: "Faith Muthoni", authorEmail: "faith.m@email.com", authorLocation: "Nakuru", rating: 4, content: "Great template overall. Works well on my phone via Google Sheets. Would love more customization options for categories.", isVerified: true, isApproved: true, isFeatured: false, helpfulCount: 18, createdAt: "2026-01-22T09:15:00Z" },

  // Chamaa Manager Reviews
  { id: "rev-4", productId: "chamaa-manager", orderId: "ord-1010", authorName: "James Kamau", authorEmail: "james.k@email.com", authorLocation: "Thika", rating: 5, content: "Our Chamaa has been using this for 6 months now. No more confusion about who paid what. Everyone can see the records!", isVerified: true, isApproved: true, isFeatured: true, helpfulCount: 67, createdAt: "2026-01-10T16:45:00Z" },
  { id: "rev-5", productId: "chamaa-manager", orderId: "ord-1011", authorName: "Esther Njeri", authorEmail: "esther.n@email.com", authorLocation: "Kiambu", rating: 5, content: "The loan tracking feature saved so many arguments in our group. Worth every shilling!", isVerified: true, isApproved: true, isFeatured: false, helpfulCount: 41, createdAt: "2026-01-25T11:30:00Z" },

  // Mtumba Business Tracker Reviews
  { id: "rev-6", productId: "mtumba-tracker", orderId: "ord-1020", authorName: "Nancy Akinyi", authorEmail: "nancy.a@email.com", authorLocation: "Gikomba, Nairobi", rating: 5, content: "Finally I know my actual profit per bale! I was losing money on some items without knowing. This tracker is a game-changer.", isVerified: true, isApproved: true, isFeatured: true, helpfulCount: 89, createdAt: "2026-01-08T08:20:00Z" },
  { id: "rev-7", productId: "mtumba-tracker", orderId: "ord-1021", authorName: "Michael Otieno", authorEmail: "michael.o@email.com", authorLocation: "Mombasa", rating: 5, content: "I sell mtumba on Instagram and this helps me track everything from bale purchase to sale. The profit calculator is amazing!", isVerified: true, isApproved: true, isFeatured: false, helpfulCount: 56, createdAt: "2026-01-20T15:10:00Z" },
  { id: "rev-8", productId: "mtumba-tracker", orderId: "ord-1022", authorName: "Susan Wambui", authorEmail: "susan.w@email.com", authorLocation: "Eldoret", rating: 4, content: "Very useful for tracking inventory. I wish it had a mobile app version, but the Google Sheets works okay on my phone.", isVerified: true, isApproved: true, isFeatured: false, helpfulCount: 23, createdAt: "2026-01-28T12:00:00Z" },

  // Small Business Bookkeeper Reviews
  { id: "rev-9", productId: "small-biz-bookkeeper", orderId: "ord-1030", authorName: "David Mwangi", authorEmail: "david.m@email.com", authorLocation: "Nairobi CBD", rating: 5, content: "Running my hardware shop is so much easier now. I can see my P&L at any time. My accountant is impressed!", isVerified: true, isApproved: true, isFeatured: true, helpfulCount: 78, createdAt: "2026-01-12T09:30:00Z" },
  { id: "rev-10", productId: "small-biz-bookkeeper", orderId: "ord-1031", authorName: "Joyce Wangari", authorEmail: "joyce.w@email.com", authorLocation: "Nyeri", rating: 5, content: "I'm not an accountant but this template makes bookkeeping simple. The guide PDF was very clear.", isVerified: true, isApproved: true, isFeatured: false, helpfulCount: 34, createdAt: "2026-01-19T14:45:00Z" },

  // Home Bakery Manager Reviews
  { id: "rev-11", productId: "bakery-manager", orderId: "ord-1040", authorName: "Lucy Nyambura", authorEmail: "lucy.n@email.com", authorLocation: "Karen, Nairobi", rating: 5, content: "My home bakery business is now so organized! I can scale recipes and track costs per order. Delivery scheduling is also great.", isVerified: true, isApproved: true, isFeatured: true, helpfulCount: 92, createdAt: "2026-01-05T10:00:00Z" },
  { id: "rev-12", productId: "bakery-manager", orderId: "ord-1041", authorName: "Ann Chebet", authorEmail: "ann.c@email.com", authorLocation: "Kericho", rating: 5, content: "I started my cake business using this tracker. Now I know exactly how much to charge for each product. Loved it!", isVerified: true, isApproved: true, isFeatured: false, helpfulCount: 45, createdAt: "2026-01-23T16:20:00Z" },

  // Landlord Manager Reviews
  { id: "rev-13", productId: "landlord-manager", orderId: "ord-1050", authorName: "John Mutua", authorEmail: "john.m@email.com", authorLocation: "Ruaka", rating: 5, content: "I manage 15 rental units and this tracker is exactly what I needed. Rent reminders and maintenance tracking are perfect.", isVerified: true, isApproved: true, isFeatured: true, helpfulCount: 67, createdAt: "2026-01-14T11:15:00Z" },
  { id: "rev-14", productId: "landlord-manager", orderId: "ord-1051", authorName: "Mary Atieno", authorEmail: "mary.a@email.com", authorLocation: "Kiserian", rating: 4, content: "Good for tracking rent payments. Would be nice to have automatic SMS reminders, but otherwise very useful.", isVerified: true, isApproved: true, isFeatured: false, helpfulCount: 28, createdAt: "2026-01-27T13:40:00Z" },

  // Hotel Management Reviews
  { id: "rev-15", productId: "hotel-management", orderId: "ord-1060", authorName: "Samuel Kipchoge", authorEmail: "samuel.k@email.com", authorLocation: "Naivasha", rating: 5, content: "Running my 20-room hotel is now so much easier. The occupancy tracking and RevPAR calculations help me make better pricing decisions.", isVerified: true, isApproved: true, isFeatured: true, helpfulCount: 54, createdAt: "2026-01-16T09:00:00Z" },
];

// Helper to get reviews by product
export function getReviewsByProduct(productId: string): Review[] {
  return seedReviews.filter(r => r.productId === productId && r.isApproved);
}

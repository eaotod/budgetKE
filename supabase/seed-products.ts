// ============================================
// BudgetKE Product Seed - Tier 1 & 2 Products
// ============================================

import type { Product } from "../lib/types";

// Helper to generate consistent product structure
const createProduct = (
  id: string,
  name: string,
  slug: string,
  categoryId: string,
  price: number,
  comparePrice: number,
  shortDescription: string,
  rating: number,
  reviewCount: number,
  downloadCount: number,
  flags: { isFeatured?: boolean; isBestseller?: boolean; isNew?: boolean } = {}
): Product => ({
  id,
  name,
  slug,
  categoryId,
  price,
  comparePrice,
  currency: "KES",
  shortDescription,
  description: shortDescription,
  whatYouGet: [
    { icon: "FileSpreadsheet", title: "Excel File (.xlsx)", description: "Fully editable spreadsheet" },
    { icon: "Cloud", title: "Google Sheets Version", description: "Cloud-synced for mobile access" },
    { icon: "FileText", title: "Quick Start Guide", description: "Step-by-step instructions" },
    { icon: "Video", title: "Video Tutorial", description: "20-minute walkthrough" },
  ],
  detailsSpecs: [
    "Works on Excel 2016+ & Google Sheets",
    "Mobile-friendly via Sheets app",
    "Pre-configured for KES currency",
    "Automatic calculations & charts",
    "Compatible with Windows, Mac, Android, iOS",
  ],
  images: [],
  thumbnailUrl: "",
  metaTitle: `${name} | BudgetKE`,
  metaDescription: shortDescription,
  keywords: [name.toLowerCase(), categoryId],
  rating,
  reviewCount,
  downloadCount,
  isFeatured: flags.isFeatured || false,
  isBestseller: flags.isBestseller || false,
  isNew: flags.isNew || false,
  status: "active",
  fileUrl: `https://storage.supabase.com/budgetke/${slug}.zip`,
  fileName: `BudgetKE-${name.replace(/\s+/g, "-")}.zip`,
  fileSize: "2.5 MB",
  fileFormat: "Excel (.xlsx), Google Sheets, PDF Guide",
});

// TIER 1: Core Templates
export const tier1Products: Product[] = [
  createProduct("budget-master-pro", "Budget Master Pro", "budget-master-pro", "personal-finance", 699, 999, "Kenya's #1 budget tracker. Track M-Pesa expenses, set savings goals, and take control of every shilling.", 4.9, 312, 2450, { isFeatured: true, isBestseller: true }),
  createProduct("debt-destroyer", "Debt Destroyer Tracker", "debt-destroyer-tracker", "personal-finance", 799, 1199, "Get out of debt faster with snowball and avalanche methods. Track all your loans in one place.", 4.8, 189, 1680, { isBestseller: true }),
  createProduct("savings-goal-planner", "Savings Goal Planner", "savings-goal-planner", "personal-finance", 699, 999, "Visualize your savings progress with beautiful charts. Track multiple goals simultaneously.", 4.7, 156, 1420, {}),
  createProduct("expense-tracker-deluxe", "Expense Tracker Deluxe", "expense-tracker-deluxe", "personal-finance", 699, 999, "Log daily expenses, categorize spending, and get monthly insights. Perfect for M-Pesa tracking.", 4.6, 203, 1890, {}),
  createProduct("chamaa-manager", "Chamaa Manager", "chamaa-manager", "personal-finance", 999, 1499, "Complete solution for Chamaa groups. Track contributions, loans, and dividends with full transparency.", 4.9, 278, 2100, { isFeatured: true, isBestseller: true }),
  createProduct("small-biz-bookkeeper", "Small Business Bookkeeper", "small-business-bookkeeper", "business-tools", 999, 1499, "Professional bookkeeping for SMEs. Track income, expenses, and generate P&L statements.", 4.8, 234, 1920, { isFeatured: true }),
  createProduct("profit-tree-tracker", "Profit Tree Business Tracker", "profit-tree-tracker", "business-tools", 1199, 1799, "Visual profit tree diagram with income streams, expense breakdown, and growth projections.", 4.9, 145, 980, { isNew: true }),
  createProduct("inventory-basic", "Inventory Manager Basic", "inventory-manager-basic", "business-tools", 999, 1499, "Track products, stock levels, and reorder points. Perfect for small retailers.", 4.7, 167, 1340, {}),
  createProduct("invoice-generator", "Invoice & Quote Generator", "invoice-quote-generator", "business-tools", 899, 1299, "Create professional invoices and quotes. Track payments and manage client database.", 4.8, 198, 1560, {}),
  createProduct("freelancer-tracker", "Freelancer Finance Tracker", "freelancer-finance-tracker", "business-tools", 899, 1299, "Track projects, client payments, and calculate taxes. Built for Kenyan freelancers.", 4.7, 134, 890, { isNew: true }),
];

// TIER 2: Industry-Specific Templates
export const tier2Products: Product[] = [
  createProduct("hotel-management", "Hotel Management Suite", "hotel-management-suite", "industry-specific", 2499, 3999, "Complete hotel management: room bookings, occupancy rates, revenue tracking, and guest database.", 4.9, 67, 420, { isFeatured: true }),
  createProduct("restaurant-manager", "Restaurant & Bar Manager", "restaurant-bar-manager", "industry-specific", 2199, 3499, "Track daily sales, food costs, inventory, and staff scheduling. Perfect for restaurants and cafes.", 4.8, 89, 560, {}),
  createProduct("catering-planner", "Catering Business Planner", "catering-business-planner", "industry-specific", 1799, 2799, "Event booking, menu costing, shopping lists, and profit per event tracking.", 4.7, 45, 320, {}),
  createProduct("bakery-manager", "Home Bakery Business Manager", "home-bakery-manager", "industry-specific", 1499, 2299, "Order tracking, recipe scaling, ingredient costs, and customer database for bakers.", 4.9, 123, 780, { isBestseller: true }),
  createProduct("mtumba-tracker", "Mtumba Business Tracker", "mtumba-business-tracker", "industry-specific", 1799, 2799, "Track bales, individual items, and real profit margins. Designed for Gikomba sellers.", 4.9, 234, 1560, { isFeatured: true, isBestseller: true }),
  createProduct("beauty-seller", "Beauty Products Seller", "beauty-products-seller", "industry-specific", 1499, 2299, "Product inventory, client appointments, service pricing, and social media sales.", 4.7, 78, 490, {}),
  createProduct("retail-shop", "General Retail Shop Manager", "general-retail-manager", "industry-specific", 1999, 2999, "Multi-product inventory, POS tracking, supplier management, and daily reports.", 4.8, 156, 980, {}),
  createProduct("scaffolding-manager", "Scaffolding Business Manager", "scaffolding-business-manager", "industry-specific", 2299, 3499, "Equipment rental, project scheduling, maintenance logs, and safety compliance.", 4.8, 34, 210, { isNew: true }),
  createProduct("construction-tracker", "Construction Project Tracker", "construction-project-tracker", "industry-specific", 2499, 3999, "Project timelines, material costs, labor tracking, and client payment schedules.", 4.9, 67, 380, {}),
  createProduct("handyman-services", "Handyman/Repair Services", "handyman-services-tracker", "industry-specific", 1699, 2499, "Job scheduling, parts tracking, time logs, and customer database for service providers.", 4.7, 45, 290, {}),
  createProduct("landlord-manager", "Landlord & Property Manager", "landlord-property-manager", "industry-specific", 2199, 3299, "Tenant database, rent collection, maintenance requests, and expense tracking.", 4.9, 189, 1230, { isBestseller: true }),
  createProduct("real-estate-agent", "Real Estate Agent Tracker", "real-estate-agent-tracker", "industry-specific", 1999, 2999, "Property listings, client database, commission calculator, and lead tracking.", 4.7, 56, 340, {}),
  createProduct("school-management", "School Management System Lite", "school-management-lite", "industry-specific", 2499, 3999, "Student database, fee tracking, gradebook, attendance, and parent communication.", 4.8, 78, 420, {}),
  createProduct("tutor-manager", "Tutor/Coaching Business Manager", "tutor-coaching-manager", "industry-specific", 1699, 2499, "Student scheduling, payment tracking, progress reports, and curriculum planning.", 4.7, 67, 380, {}),
  createProduct("salon-manager", "Salon/Barbershop Manager", "salon-barbershop-manager", "industry-specific", 1799, 2799, "Appointment booking, service pricing, product inventory, and staff commissions.", 4.8, 134, 890, {}),
  createProduct("laundry-manager", "Laundry/Dry Cleaning Manager", "laundry-dryclean-manager", "industry-specific", 1499, 2299, "Order tracking, customer database, pricing calculator, and delivery schedule.", 4.6, 45, 280, {}),
  createProduct("transport-tracker", "Transport/Logistics Tracker", "transport-logistics-tracker", "industry-specific", 1999, 2999, "Vehicle maintenance, fuel tracking, route planning, and profit per route analysis.", 4.7, 89, 540, {}),
];

// Combined products for export
export const allSeedProducts: Product[] = [...tier1Products, ...tier2Products];

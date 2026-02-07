// ============================================
// BudgetKE Clean Seed Data
// 4 Categories, 12 Products (3 per category), 3 Bundles
// ============================================

import type { Category } from "../lib/types";

// ============================================
// CATEGORIES (4 total)
// ============================================

export const seedCategories: Category[] = [
  {
    id: "personal-finance",
    name: "Personal Finance",
    slug: "personal-finance",
    description: "Take control of your money with budget trackers, savings planners, and debt management tools designed for Kenyan households.",
    icon: "Wallet01Icon",
    displayOrder: 1,
    productCount: 3,
    metaTitle: "Personal Finance Templates Kenya | Budget Planners & Trackers",
    metaDescription: "Download professional budget planners, savings trackers, and debt management tools made for Kenyans. M-Pesa ready.",
  },
  {
    id: "business-tools",
    name: "Business Tools",
    slug: "business-tools",
    description: "Professional bookkeeping, inventory, and financial management tools for Kenyan SMEs and entrepreneurs.",
    icon: "Briefcase01Icon",
    displayOrder: 2,
    productCount: 3,
    metaTitle: "Business Templates Kenya | Bookkeeping & Inventory Tools",
    metaDescription: "Streamline your Kenyan business with professional Excel templates for bookkeeping, inventory, and financial reporting.",
  },
  {
    id: "industry-specific",
    name: "Industry Specific",
    slug: "industry-specific",
    description: "Specialized templates for specific Kenyan industries including Mtumba, hospitality, retail, and real estate.",
    icon: "Building01Icon",
    displayOrder: 3,
    productCount: 3,
    metaTitle: "Industry Templates Kenya | Mtumba, Hospitality & Retail",
    metaDescription: "Specialized business templates for Kenyan industries. Track inventory, manage finances, and grow your business.",
  },
  {
    id: "advanced-solutions",
    name: "Advanced Solutions",
    slug: "advanced-solutions",
    description: "Progressive Web Apps, VBA applications, and desktop software for businesses that have outgrown spreadsheets.",
    icon: "Settings02Icon",
    displayOrder: 4,
    productCount: 3,
    metaTitle: "Advanced Business Solutions Kenya | PWA & Custom Software",
    metaDescription: "Offline-first PWAs, VBA applications, and C# desktop software for established Kenyan businesses. Built for scale.",
  },
];

// ============================================
// PRODUCTS (12 total - 3 per category)
// ============================================

interface SeedProduct {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  productType: "template" | "advanced_solution";
  price: number;
  comparePrice?: number;
  shortDescription: string;
  description: string;
  features: string[];
  whatsIncluded: string[];
  requirements: string[];
  technicalDetails: Record<string, string>;
  videoUrl: string;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isBestseller: boolean;
  isNew: boolean;
  status: "active" | "draft" | "archived";
  fileUrl: string;
  fileName: string;
  fileSize: string;
  fileFormat: string;
}

export const seedProducts: SeedProduct[] = [
  // ============================================
  // PERSONAL FINANCE (3 products)
  // ============================================
  {
    id: "budget-master-pro",
    name: "Budget Master Pro",
    slug: "budget-master-pro",
    categoryId: "personal-finance",
    productType: "template",
    price: 699,
    comparePrice: 999,
    shortDescription: "Kenya's #1 budget tracker. Track M-Pesa expenses, set savings goals, and take control of every shilling.",
    description: "Complete monthly and yearly budget planner with income tracking, expense categorization, savings goals, and beautiful visual charts. Pre-configured for KES currency and M-Pesa transactions.",
    features: [
      "Track income and expenses",
      "Set and monitor savings goals",
      "Debt payoff calculator",
      "Automatic calculations & charts",
      "12-month view + yearly summary",
    ],
    whatsIncluded: [
      "Excel File (.xlsx) - Fully editable spreadsheet",
      "Google Sheets Version - Cloud-synced for mobile access",
      "Quick Start Guide - Step-by-step instructions",
      "Video Tutorial - 20-minute walkthrough",
    ],
    requirements: [
      "Microsoft Excel 2016 or later",
      "Google account for Sheets version",
      "Windows, Mac, Android, or iOS",
      "Basic spreadsheet knowledge",
    ],
    technicalDetails: {
      excel_version: "Excel 2016+",
      file_format: ".xlsx",
      compatibility: "Windows, Mac, Android, iOS",
    },
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 4.9,
    reviewCount: 312,
    isFeatured: true,
    isBestseller: true,
    isNew: false,
    status: "active",
    fileUrl: "products/files/budget-master-pro.zip",
    fileName: "BudgetKE-Budget-Master-Pro.zip",
    fileSize: "2.5 MB",
    fileFormat: "XLSX",
  },
  {
    id: "chamaa-manager",
    name: "Chamaa Manager",
    slug: "chamaa-manager",
    categoryId: "personal-finance",
    productType: "template",
    price: 999,
    comparePrice: 1499,
    shortDescription: "Complete solution for Chamaa groups. Track contributions, loans, and dividends with full transparency.",
    description: "Designed specifically for Kenyan Chamaa groups. Manage member contributions, track loans, calculate dividends, and maintain complete financial transparency for your savings group.",
    features: [
      "Member contribution tracking",
      "Loan management system",
      "Dividend calculator",
      "Meeting schedule & minutes",
      "SMS reminder templates",
    ],
    whatsIncluded: [
      "Excel File (.xlsx) - Fully editable spreadsheet",
      "Google Sheets Version - Cloud-synced for mobile access",
      "Quick Start Guide - Step-by-step instructions",
      "Video Tutorial - 20-minute walkthrough",
    ],
    requirements: [
      "Microsoft Excel 2016 or later",
      "Google account for Sheets version",
      "Windows, Mac, Android, or iOS",
      "Basic spreadsheet knowledge",
    ],
    technicalDetails: {
      excel_version: "Excel 2016+",
      file_format: ".xlsx",
      compatibility: "Windows, Mac, Android, iOS",
    },
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 4.9,
    reviewCount: 278,
    isFeatured: true,
    isBestseller: true,
    isNew: false,
    status: "active",
    fileUrl: "products/files/chamaa-manager.zip",
    fileName: "BudgetKE-Chamaa-Manager.zip",
    fileSize: "3.2 MB",
    fileFormat: "XLSX",
  },
  {
    id: "expense-tracker-deluxe",
    name: "Expense Tracker Deluxe",
    slug: "expense-tracker-deluxe",
    categoryId: "personal-finance",
    productType: "template",
    price: 699,
    shortDescription: "Log daily expenses, categorize spending, and get monthly insights. Perfect for M-Pesa tracking.",
    description: "Simple yet powerful expense tracking with category analysis, monthly comparisons, and spending alerts. Designed for Kenyan mobile money users.",
    features: [
      "Daily expense logging",
      "Category analysis",
      "Monthly comparisons",
      "Spending alerts",
      "M-Pesa transaction tracking",
    ],
    whatsIncluded: [
      "Excel File (.xlsx) - Fully editable spreadsheet",
      "Google Sheets Version - Cloud-synced for mobile access",
      "Quick Start Guide - Step-by-step instructions",
      "Video Tutorial - 20-minute walkthrough",
    ],
    requirements: [
      "Microsoft Excel 2016 or later",
      "Google account for Sheets version",
      "Windows, Mac, Android, or iOS",
      "Basic spreadsheet knowledge",
    ],
    technicalDetails: {
      excel_version: "Excel 2016+",
      file_format: ".xlsx",
      compatibility: "Windows, Mac, Android, iOS",
    },
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 4.6,
    reviewCount: 203,
    isFeatured: false,
    isBestseller: false,
    isNew: true,
    status: "active",
    fileUrl: "products/files/expense-tracker-deluxe.zip",
    fileName: "BudgetKE-Expense-Tracker-Deluxe.zip",
    fileSize: "1.8 MB",
    fileFormat: "XLSX",
  },

  // ============================================
  // BUSINESS TOOLS (3 products)
  // ============================================
  {
    id: "small-biz-bookkeeper",
    name: "Small Business Bookkeeper",
    slug: "small-business-bookkeeper",
    categoryId: "business-tools",
    productType: "template",
    price: 999,
    comparePrice: 1499,
    shortDescription: "Professional bookkeeping for SMEs. Track income, expenses, and generate P&L statements.",
    description: "Complete bookkeeping solution for small businesses. Track all income and expenses, categorize transactions, generate profit & loss statements, and prepare for tax season.",
    features: [
      "Income tracking",
      "Expense categorization",
      "Profit/loss statements",
      "Cash flow tracker",
      "Tax preparation helper",
    ],
    whatsIncluded: [
      "Excel File (.xlsx) - Fully editable spreadsheet",
      "Google Sheets Version - Cloud-synced for mobile access",
      "Quick Start Guide - Step-by-step instructions",
      "Video Tutorial - 20-minute walkthrough",
    ],
    requirements: [
      "Microsoft Excel 2016 or later",
      "Google account for Sheets version",
      "Windows, Mac, Android, or iOS",
      "Basic spreadsheet knowledge",
    ],
    technicalDetails: {
      excel_version: "Excel 2016+",
      file_format: ".xlsx",
      compatibility: "Windows, Mac, Android, iOS",
    },
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 4.8,
    reviewCount: 234,
    isFeatured: true,
    isBestseller: false,
    isNew: false,
    status: "active",
    fileUrl: "products/files/small-biz-bookkeeper.zip",
    fileName: "BudgetKE-Small-Business-Bookkeeper.zip",
    fileSize: "2.8 MB",
    fileFormat: "XLSX",
  },
  {
    id: "inventory-basic",
    name: "Inventory Manager Basic",
    slug: "inventory-manager-basic",
    categoryId: "business-tools",
    productType: "template",
    price: 999,
    comparePrice: 1499,
    shortDescription: "Track products, stock levels, and reorder points. Perfect for small retailers.",
    description: "Simple inventory management for retail shops. Track product catalog, monitor stock levels, set reorder alerts, and manage supplier information.",
    features: [
      "Product catalog",
      "Stock level tracking",
      "Reorder alerts",
      "Cost tracking",
      "Simple sales integration",
    ],
    whatsIncluded: [
      "Excel File (.xlsx) - Fully editable spreadsheet",
      "Google Sheets Version - Cloud-synced for mobile access",
      "Quick Start Guide - Step-by-step instructions",
      "Video Tutorial - 20-minute walkthrough",
    ],
    requirements: [
      "Microsoft Excel 2016 or later",
      "Google account for Sheets version",
      "Windows, Mac, Android, or iOS",
      "Basic spreadsheet knowledge",
    ],
    technicalDetails: {
      excel_version: "Excel 2016+",
      file_format: ".xlsx",
      compatibility: "Windows, Mac, Android, iOS",
    },
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 4.7,
    reviewCount: 167,
    isFeatured: false,
    isBestseller: false,
    isNew: false,
    status: "active",
    fileUrl: "products/files/inventory-basic.zip",
    fileName: "BudgetKE-Inventory-Manager-Basic.zip",
    fileSize: "2.3 MB",
    fileFormat: "XLSX",
  },
  {
    id: "invoice-generator",
    name: "Invoice & Quote Generator",
    slug: "invoice-quote-generator",
    categoryId: "business-tools",
    productType: "template",
    price: 899,
    comparePrice: 1299,
    shortDescription: "Create professional invoices and quotes. Track payments and manage client database.",
    description: "Professional invoicing solution with quote generation, payment tracking, and client management. Includes VAT calculations and customizable templates.",
    features: [
      "Professional invoice templates",
      "Quote/estimate creator",
      "Payment tracking",
      "Client database",
      "Tax calculations (VAT)",
    ],
    whatsIncluded: [
      "Excel File (.xlsx) - Fully editable spreadsheet",
      "Google Sheets Version - Cloud-synced for mobile access",
      "Quick Start Guide - Step-by-step instructions",
      "Video Tutorial - 20-minute walkthrough",
    ],
    requirements: [
      "Microsoft Excel 2016 or later",
      "Google account for Sheets version",
      "Windows, Mac, Android, or iOS",
      "Basic spreadsheet knowledge",
    ],
    technicalDetails: {
      excel_version: "Excel 2016+",
      file_format: ".xlsx",
      compatibility: "Windows, Mac, Android, iOS",
    },
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 4.8,
    reviewCount: 198,
    isFeatured: false,
    isBestseller: true,
    isNew: false,
    status: "active",
    fileUrl: "products/files/invoice-generator.zip",
    fileName: "BudgetKE-Invoice-Quote-Generator.zip",
    fileSize: "2.1 MB",
    fileFormat: "XLSX",
  },

  // ============================================
  // INDUSTRY SPECIFIC (3 products)
  // ============================================
  {
    id: "mtumba-tracker",
    name: "Mtumba Business Tracker",
    slug: "mtumba-business-tracker",
    categoryId: "industry-specific",
    productType: "template",
    price: 1799,
    comparePrice: 2799,
    shortDescription: "Track bales, individual items, and real profit margins. Designed for Gikomba sellers.",
    description: "Specialized for Kenyan mtumba businesses. Track bale costs, individual item pricing, daily sales, and calculate true profit margins. Built for Gikomba and other markets.",
    features: [
      "Bale cost tracker",
      "Item pricing calculator",
      "Daily sales log",
      "Profit margin calculator",
      "Restock planning",
    ],
    whatsIncluded: [
      "Excel File (.xlsx) - Fully editable spreadsheet",
      "Google Sheets Version - Cloud-synced for mobile access",
      "Quick Start Guide - Step-by-step instructions",
      "Video Tutorial - 20-minute walkthrough",
    ],
    requirements: [
      "Microsoft Excel 2016 or later",
      "Google account for Sheets version",
      "Windows, Mac, Android, or iOS",
      "Basic spreadsheet knowledge",
    ],
    technicalDetails: {
      excel_version: "Excel 2016+",
      file_format: ".xlsx",
      compatibility: "Windows, Mac, Android, iOS",
    },
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 4.9,
    reviewCount: 234,
    isFeatured: true,
    isBestseller: true,
    isNew: false,
    status: "active",
    fileUrl: "products/files/mtumba-tracker.zip",
    fileName: "BudgetKE-Mtumba-Business-Tracker.zip",
    fileSize: "2.6 MB",
    fileFormat: "XLSX",
  },
  {
    id: "hotel-management",
    name: "Hotel Management Suite",
    slug: "hotel-management-suite",
    categoryId: "industry-specific",
    productType: "template",
    price: 2499,
    comparePrice: 3999,
    shortDescription: "Complete hotel management: room bookings, occupancy rates, revenue tracking, and guest database.",
    description: "Comprehensive hotel management system. Track room bookings, calculate occupancy rates and RevPAR, manage housekeeping schedules, and maintain guest database.",
    features: [
      "Room booking tracker",
      "Occupancy rate calculator",
      "Revenue per available room (RevPAR)",
      "Housekeeping schedule",
      "Guest database",
    ],
    whatsIncluded: [
      "Excel File (.xlsx) - Fully editable spreadsheet",
      "Google Sheets Version - Cloud-synced for mobile access",
      "Quick Start Guide - Step-by-step instructions",
      "Video Tutorial - 20-minute walkthrough",
    ],
    requirements: [
      "Microsoft Excel 2016 or later",
      "Google account for Sheets version",
      "Windows, Mac, Android, or iOS",
      "Basic spreadsheet knowledge",
    ],
    technicalDetails: {
      excel_version: "Excel 2016+",
      file_format: ".xlsx",
      compatibility: "Windows, Mac, Android, iOS",
    },
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 4.9,
    reviewCount: 67,
    isFeatured: true,
    isBestseller: false,
    isNew: false,
    status: "active",
    fileUrl: "products/files/hotel-management.zip",
    fileName: "BudgetKE-Hotel-Management-Suite.zip",
    fileSize: "3.5 MB",
    fileFormat: "XLSX",
  },
  {
    id: "landlord-manager",
    name: "Landlord & Property Manager",
    slug: "landlord-property-manager",
    categoryId: "industry-specific",
    productType: "template",
    price: 2199,
    comparePrice: 3299,
    shortDescription: "Tenant database, rent collection, maintenance requests, and expense tracking per property.",
    description: "Complete property management solution. Manage tenant information, track rent collection, handle maintenance requests, and monitor expenses for multiple properties.",
    features: [
      "Tenant database",
      "Rent collection tracker",
      "Maintenance requests",
      "Expense tracking per property",
      "Lease renewal reminders",
    ],
    whatsIncluded: [
      "Excel File (.xlsx) - Fully editable spreadsheet",
      "Google Sheets Version - Cloud-synced for mobile access",
      "Quick Start Guide - Step-by-step instructions",
      "Video Tutorial - 20-minute walkthrough",
    ],
    requirements: [
      "Microsoft Excel 2016 or later",
      "Google account for Sheets version",
      "Windows, Mac, Android, or iOS",
      "Basic spreadsheet knowledge",
    ],
    technicalDetails: {
      excel_version: "Excel 2016+",
      file_format: ".xlsx",
      compatibility: "Windows, Mac, Android, iOS",
    },
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 4.9,
    reviewCount: 189,
    isFeatured: false,
    isBestseller: true,
    isNew: false,
    status: "active",
    fileUrl: "products/files/landlord-manager.zip",
    fileName: "BudgetKE-Landlord-Property-Manager.zip",
    fileSize: "3.1 MB",
    fileFormat: "XLSX",
  },

  // ============================================
  // ADVANCED SOLUTIONS (3 products - PWAs/VBA/Desktop)
  // ============================================
  {
    id: "pwa-budget-master",
    name: "PWA Budget Master",
    slug: "pwa-budget-master",
    categoryId: "advanced-solutions",
    productType: "advanced_solution",
    price: 2999,
    comparePrice: 4999,
    shortDescription: "Offline-first budget app. Install to phone/desktop, works without internet, beautiful UI.",
    description: "Progressive Web App that works completely offline. Install like a native app, sync across devices when online. No Excel knowledge needed - simple, beautiful interface for everyone.",
    features: [
      "Install to phone/desktop",
      "Works completely offline",
      "Beautiful, simple UI",
      "Auto-sync when online",
      "Export to Excel/PDF",
    ],
    whatsIncluded: [
      "PWA Application - Installable web app",
      "Cloud Sync - Automatic backup",
      "Mobile & Desktop - Works everywhere",
      "Video Tutorial - Complete walkthrough",
      "Priority Support - 90 days included",
    ],
    requirements: [
      "Modern web browser (Chrome, Safari, Firefox, Edge)",
      "Internet connection for initial setup",
      "Android, iOS, Windows, or Mac",
      "No technical knowledge required",
    ],
    technicalDetails: {
      technology_stack: "Progressive Web App (PWA)",
      platform: "Web, Android, iOS, Windows, Mac",
      deployment_type: "Cloud-hosted with offline capability",
    },
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 5.0,
    reviewCount: 45,
    isFeatured: true,
    isBestseller: false,
    isNew: true,
    status: "active",
    fileUrl: "products/apps/pwa-budget-master",
    fileName: "PWA-Budget-Master-Access",
    fileSize: "Cloud App",
    fileFormat: "PWA",
  },
  {
    id: "vba-inventory-pro",
    name: "VBA Inventory Pro",
    slug: "vba-inventory-pro",
    categoryId: "advanced-solutions",
    productType: "advanced_solution",
    price: 4999,
    comparePrice: 7999,
    shortDescription: "Advanced Excel with VBA automation. Barcode scanning, auto-reordering, multi-location support.",
    description: "Professional inventory system built with Excel VBA. Includes barcode scanning integration, automatic reorder alerts, multi-location tracking, and advanced reporting. For businesses that need more than basic templates.",
    features: [
      "VBA-powered automation",
      "Barcode scanner integration",
      "Multi-location tracking",
      "Automatic reorder alerts",
      "Advanced reporting dashboard",
    ],
    whatsIncluded: [
      "Excel VBA Application - Macro-enabled workbook",
      "Barcode Scanner Setup - Integration guide",
      "Training Session - 1-hour live training",
      "Documentation - Complete user manual",
      "Priority Support - 6 months included",
    ],
    requirements: [
      "Microsoft Excel 2016 or later (Windows)",
      "Macros must be enabled",
      "Windows 10 or later",
      "Barcode scanner (optional)",
    ],
    technicalDetails: {
      technology_stack: "Excel VBA with Access database",
      platform: "Windows Desktop",
      deployment_type: "Desktop application",
    },
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 4.8,
    reviewCount: 23,
    isFeatured: false,
    isBestseller: false,
    isNew: true,
    status: "active",
    fileUrl: "products/apps/vba-inventory-pro.xlsm",
    fileName: "VBA-Inventory-Pro.xlsm",
    fileSize: "5.2 MB",
    fileFormat: "XLSM",
  },
  {
    id: "desktop-pos-system",
    name: "Desktop POS System",
    slug: "desktop-pos-system",
    categoryId: "advanced-solutions",
    productType: "advanced_solution",
    price: 9999,
    comparePrice: 14999,
    shortDescription: "Full C# desktop POS. Receipt printing, M-Pesa integration, inventory sync, multi-user support.",
    description: "Professional Point of Sale system built with C# for Windows. Includes receipt printing, M-Pesa payment integration, real-time inventory sync, multi-user support, and comprehensive reporting. Enterprise-grade solution for established businesses.",
    features: [
      "Full POS functionality",
      "Receipt printer integration",
      "M-Pesa payment integration",
      "Real-time inventory sync",
      "Multi-user/multi-terminal support",
    ],
    whatsIncluded: [
      "Desktop Application - C# Windows app",
      "Database Setup - SQL Server Express",
      "Hardware Integration - Receipt printer, barcode scanner",
      "Training Sessions - 3 hours of training",
      "Priority Support - 1 year included",
    ],
    requirements: [
      "Windows 10 or later",
      ".NET Framework 4.8+",
      "SQL Server Express (free)",
      "Receipt printer (recommended)",
      "Stable internet for M-Pesa",
    ],
    technicalDetails: {
      technology_stack: "C#, WPF, SQL Server",
      platform: "Windows Desktop",
      deployment_type: "Desktop with cloud sync",
    },
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    rating: 5.0,
    reviewCount: 12,
    isFeatured: true,
    isBestseller: false,
    isNew: true,
    status: "active",
    fileUrl: "products/apps/desktop-pos-system.exe",
    fileName: "BudgetKE-POS-Installer.exe",
    fileSize: "45 MB",
    fileFormat: "EXE",
  },
];

// ============================================
// BUNDLES (3 total)
// ============================================

interface SeedBundle {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  productIds: string[];
  originalPrice: number;
  bundlePrice: number;
  isFeatured: boolean;
  status: "active" | "draft" | "archived";
  metaTitle: string;
  metaDescription: string;
}

export const seedBundles: SeedBundle[] = [
  {
    id: "personal-finance-bundle",
    name: "Personal Finance Bundle",
    slug: "personal-finance-bundle",
    description: "Complete personal finance toolkit. Everything you need to master your money: budget tracking, expense logging, and Chamaa management. Save 32% when you buy the bundle.",
    shortDescription: "All 3 personal finance templates. Track budgets, expenses, and manage your Chamaa. Save 32%.",
    productIds: ["budget-master-pro", "chamaa-manager", "expense-tracker-deluxe"],
    originalPrice: 2397,
    bundlePrice: 1699,
    isFeatured: true,
    status: "active",
    metaTitle: "Personal Finance Bundle - Save 32% | BudgetKE",
    metaDescription: "Get all 3 personal finance templates: Budget Master Pro, Chamaa Manager, and Expense Tracker. Complete money management toolkit for Kenyans.",
  },
  {
    id: "business-starter-bundle",
    name: "Business Starter Bundle",
    slug: "business-starter-bundle",
    description: "Everything a small business needs to get started. Professional bookkeeping, inventory management, and invoicing tools. Save 30% with this bundle.",
    shortDescription: "All 3 business tools. Bookkeeping, inventory, and invoicing. Perfect for SMEs. Save 30%.",
    productIds: ["small-biz-bookkeeper", "inventory-basic", "invoice-generator"],
    originalPrice: 2897,
    bundlePrice: 1999,
    isFeatured: true,
    status: "active",
    metaTitle: "Business Starter Bundle - Save 30% | BudgetKE",
    metaDescription: "Complete business toolkit: Bookkeeper, Inventory Manager, and Invoice Generator. Everything your SME needs to succeed.",
  },
  {
    id: "industry-pro-bundle",
    name: "Industry Pro Bundle",
    slug: "industry-pro-bundle",
    description: "Specialized tools for Kenyan industries. Mtumba tracking, hotel management, and property management. Built for specific business needs. Save 35%.",
    shortDescription: "3 industry-specific templates. Mtumba, Hotel, and Property Management. Save 35%.",
    productIds: ["mtumba-tracker", "hotel-management", "landlord-manager"],
    originalPrice: 6497,
    bundlePrice: 4299,
    isFeatured: false,
    status: "active",
    metaTitle: "Industry Pro Bundle - Save 35% | BudgetKE",
    metaDescription: "Specialized templates for Kenyan businesses: Mtumba Tracker, Hotel Management, and Property Manager. Industry-specific solutions.",
  },
];

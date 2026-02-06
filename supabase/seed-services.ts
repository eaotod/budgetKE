// ============================================
// BudgetKE Seed Data - Categories & Services
// ============================================

import type { Category, Service } from "../lib/types";

// Extended Categories
export const seedCategories: Category[] = [
  {
    id: "personal-finance",
    name: "Personal Finance",
    slug: "personal-finance",
    description: "Take control of your money with budget trackers, savings planners, and debt management tools designed for Kenyan households.",
    icon: "Wallet01Icon",
    displayOrder: 1,
    productCount: 5,
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
    productCount: 5,
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
    productCount: 17,
    metaTitle: "Industry Templates Kenya | Mtumba, Hospitality & Retail",
    metaDescription: "Specialized business templates for Kenyan industries. Track inventory, manage finances, and grow your business.",
  },
  {
    id: "advanced-solutions",
    name: "Advanced Solutions",
    slug: "advanced-solutions",
    description: "Premium workflows, automation-ready toolkits, and advanced systems for growing teams and complex operations.",
    icon: "Settings02Icon",
    displayOrder: 4,
    productCount: 0,
    metaTitle: "Advanced Business Solutions Kenya | Automation & Systems",
    metaDescription: "Advanced financial and operational systems for established Kenyan businesses. Built for scale.",
  },
];

export const services: Service[] = [
  {
    id: "custom-template-basic",
    name: "Custom Excel Template",
    slug: "custom-excel-template",
    tier: "basic",
    priceMin: 15000,
    priceMax: 30000,
    currency: "KES",
    timeline: "3-5 days",
    shortDescription: "Fully customized Excel/Sheets template built to your exact specifications.",
    description: "Get a professional template designed specifically for your business workflow. Includes consultation, unlimited revisions, and training.",
    features: [
      "1-2 consultation calls",
      "Fully customized to your needs",
      "Unlimited revisions",
      "30 days support",
      "Video tutorial included",
    ],
    deliverables: [
      "Excel file (.xlsx)",
      "Google Sheets version",
      "Quick start PDF guide",
      "Custom video walkthrough",
    ],
    status: "active",
  },
  {
    id: "custom-template-advanced",
    name: "Advanced Custom Template",
    slug: "advanced-custom-template",
    tier: "advanced",
    priceMin: 30000,
    priceMax: 60000,
    currency: "KES",
    timeline: "1-2 weeks",
    shortDescription: "Complex templates with automations, macros, and API integrations.",
    description: "For businesses needing advanced functionality including macros, scripts, multi-sheet systems, and external data connections.",
    features: [
      "Complex calculations & automations",
      "Multiple connected sheets",
      "Dashboard with live charts",
      "Google Apps Script/VBA macros",
      "API integrations where possible",
      "60 days priority support",
    ],
    deliverables: [
      "Complete Excel workbook",
      "Google Sheets with Apps Script",
      "Technical documentation",
      "Training session (1 hour)",
    ],
    status: "active",
  },
  {
    id: "custom-pwa-basic",
    name: "Simple Custom PWA",
    slug: "simple-custom-pwa",
    tier: "advanced",
    priceMin: 60000,
    priceMax: 120000,
    currency: "KES",
    timeline: "2-3 weeks",
    shortDescription: "Offline-first Progressive Web App based on our proven templates.",
    description: "A beautiful, installable web app that works offline. Perfect for businesses that need mobile access without app store complexity.",
    features: [
      "Based on existing template design",
      "Custom branding (logo, colors)",
      "Offline capability",
      "Works on mobile & desktop",
      "Auto-sync when online",
      "90 days support",
    ],
    deliverables: [
      "Hosted PWA application",
      "Custom domain setup",
      "User documentation",
      "Admin training",
    ],
    status: "active",
  },
  {
    id: "custom-pwa-advanced",
    name: "Advanced Custom PWA",
    slug: "advanced-custom-pwa",
    tier: "premium",
    priceMin: 150000,
    priceMax: 300000,
    currency: "KES",
    timeline: "4-8 weeks",
    shortDescription: "Fully custom PWA built from scratch with cloud backend and team features.",
    description: "Enterprise-grade Progressive Web App with custom business logic, multi-user support, cloud sync, and payment integration.",
    features: [
      "Built from scratch",
      "Complex business logic",
      "Multi-user/team features",
      "Cloud backend (Supabase)",
      "Custom reporting & analytics",
      "Payment integration (M-Pesa)",
      "6 months priority support",
    ],
    deliverables: [
      "Production-ready PWA",
      "Cloud infrastructure setup",
      "Source code (optional)",
      "Full documentation",
      "Team training sessions",
    ],
    status: "active",
  },
  {
    id: "business-audit",
    name: "Business Process Audit",
    slug: "business-process-audit",
    tier: "basic",
    priceMin: 25000,
    priceMax: 50000,
    currency: "KES",
    timeline: "1 week",
    shortDescription: "Comprehensive analysis of your current systems with actionable recommendations.",
    description: "We analyze your current business processes, identify inefficiencies, and provide a detailed roadmap for improvement with tool recommendations.",
    features: [
      "Current system analysis",
      "Inefficiency identification",
      "Tool recommendations",
      "Implementation roadmap",
      "ROI projections",
    ],
    deliverables: [
      "Audit report (PDF)",
      "Process flow diagrams",
      "Recommended solutions",
      "Priority action plan",
    ],
    status: "active",
  },
  {
    id: "full-implementation",
    name: "Complete System Implementation",
    slug: "complete-system-implementation",
    tier: "premium",
    priceMin: 100000,
    priceMax: 250000,
    currency: "KES",
    timeline: "1-3 months",
    shortDescription: "End-to-end business system setup including tools, training, and ongoing support.",
    description: "Full-service implementation including process mapping, custom tool development, team training, and 3 months of ongoing support.",
    features: [
      "Complete process mapping",
      "Custom tool development",
      "Team training (all staff)",
      "Change management support",
      "3 months ongoing support",
      "Monthly progress reviews",
    ],
    deliverables: [
      "All custom tools",
      "Training materials",
      "Process documentation",
      "Support SLA",
    ],
    status: "active",
  },
];

// Add-ons
export interface AddOn {
  id: string;
  name: string;
  price: number;
  priceType: "one-time" | "monthly" | "per-person";
  currency: string;
  description: string;
  applicableTo: "templates" | "services" | "all";
}

export const addOns: AddOn[] = [
  { id: "support-90", name: "90-Day Email Support", price: 499, priceType: "one-time", currency: "KES", description: "Extended email support for 90 days", applicableTo: "templates" },
  { id: "support-1yr", name: "1-Year Email Support", price: 1499, priceType: "one-time", currency: "KES", description: "Full year of email support", applicableTo: "templates" },
  { id: "priority-support", name: "Priority Support", price: 2999, priceType: "monthly", currency: "KES", description: "24-hour response, WhatsApp & screen sharing", applicableTo: "all" },
  { id: "workshop", name: "Template Mastery Workshop", price: 2999, priceType: "per-person", currency: "KES", description: "2-hour live training session with Q&A", applicableTo: "templates" },
  { id: "financial-course", name: "Financial Literacy Course", price: 9999, priceType: "one-time", currency: "KES", description: "4-week course with 1-on-1 consultation", applicableTo: "templates" },
  { id: "bookkeeping-bootcamp", name: "Business Bookkeeping Bootcamp", price: 12999, priceType: "one-time", currency: "KES", description: "Comprehensive bookkeeping training for SMEs", applicableTo: "templates" },
  { id: "reseller-license", name: "Template Reseller License", price: 25000, priceType: "one-time", currency: "KES", description: "Rights to rebrand and resell a template", applicableTo: "templates" },
  { id: "pwa-whitelabel", name: "PWA White Label License", price: 100000, priceType: "one-time", currency: "KES", description: "Full source code with rebranding rights", applicableTo: "services" },
];

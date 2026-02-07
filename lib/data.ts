// ============================================
// BudgetKE Complete Data
// Comprehensive product catalog with BestSelf-style content
// ============================================

import type { 
  Product,
//   Category,
//   Bundle,
  Testimonial,
  ProductFAQ,
  Service
} from "./types";
// ============================================
// CATEGORIES
// ============================================

// Categories are now managed in Supabase database ("categories" table).
// See /app/manage/categories for management.

// ============================================
// PRODUCTS
// ============================================

// Products are now managed in Supabase database ("products" table).
// See /app/manage/products for management.

// ============================================
// BUNDLES
// ============================================

// Bundles are now managed in Supabase database ("bundles" table).
// See /app/manage/bundles for management.

// ============================================
// TESTIMONIALS (Wall of Love)
// ============================================

export const testimonials: Testimonial[] = [
  {
    id: "1",
    authorName: "Grace Wanjiku",
    authorTitle: "Small Business Owner",
    authorLocation: "Nairobi",
    authorAvatar: "/images/testimonials/grace.jpg",
    content: "I used to dread doing my business books. Now with the Bookkeeping Kit, I actually understand my finances! I know exactly how much profit I make each month. Worth every shilling.",
    shortQuote: "I know exactly how much profit I make each month.",
    rating: 5,
    isFeatured: true,
    displayOrder: 1,
    hasVideo: false,
  },
  {
    id: "2",
    authorName: "Kevin Omondi",
    authorTitle: "Mtumba Seller",
    authorCompany: "Gikomba Market",
    authorLocation: "Nairobi",
    authorAvatar: "/images/testimonials/kevin.jpg",
    content: "Before BudgetKE, I had no idea if I was making money or not. The Mtumba tracker changed my business. Now I know which bales give me the best profit and which to avoid.",
    shortQuote: "Now I know which bales give me the best profit.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoThumbnail: "/images/testimonials/kevin-video.jpg",
    rating: 5,
    isFeatured: true,
    displayOrder: 2,
    hasVideo: true,
  },
  {
    id: "3",
    authorName: "Faith Muthoni",
    authorTitle: "University Student",
    authorLocation: "Nakuru",
    authorAvatar: "/images/testimonials/faith.jpg",
    content: "As a student with limited income, the Budget Planner helped me finally save for a new laptop. The visual progress bar kept me motivated. Saved KES 45,000 in 6 months!",
    shortQuote: "Saved KES 45,000 in 6 months!",
    rating: 5,
    isFeatured: true,
    displayOrder: 3,
    hasVideo: false,
  },
  {
    id: "4",
    authorName: "James Kimani",
    authorTitle: "Chamaa Treasurer",
    authorCompany: "Upendo Investment Group",
    authorLocation: "Thika",
    authorAvatar: "/images/testimonials/james.jpg",
    content: "Our Chamaa had constant disputes about contributions. Since we started using the Chamaa Manager, everything is transparent. Members trust the records and meetings are peaceful now.",
    shortQuote: "Members trust the records and meetings are peaceful.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoThumbnail: "/images/testimonials/james-video.jpg",
    rating: 5,
    isFeatured: true,
    displayOrder: 4,
    hasVideo: true,
  },
  {
    id: "5",
    authorName: "Lucy Akinyi",
    authorTitle: "Restaurant Owner",
    authorCompany: "Mama Lucy's Kitchen",
    authorLocation: "Kisumu",
    authorAvatar: "/images/testimonials/lucy.jpg",
    content: "The Restaurant Finance Manager showed me my food cost percentage was 45%! Way too high. After adjusting portions and suppliers, I got it down to 32%. My profit doubled.",
    shortQuote: "My profit doubled.",
    rating: 5,
    isFeatured: true,
    displayOrder: 5,
    hasVideo: false,
  },
  {
    id: "6",
    authorName: "Peter Mwangi",
    authorTitle: "Couple",
    authorLocation: "Mombasa",
    authorAvatar: "/images/testimonials/peter.jpg",
    content: "My wife and I used to fight about money all the time. The Budget Planner gave us a shared view of our finances. We're now on the same page and working toward our goals together.",
    shortQuote: "We're now working toward our goals together.",
    rating: 5,
    isFeatured: false,
    displayOrder: 6,
    hasVideo: false,
  },
];

// ============================================
// PRODUCT FAQs
// ============================================

export const productFaqsByType: Record<
  Product["productType"],
  ProductFAQ[]
> = {
  template: [
    {
      id: "tpl-faq-1",
      productId: "template",
      question: "Will this work on my phone?",
      answer:
        "Yes. The Google Sheets version is mobile-friendly. For the best experience, use Excel on desktop and Google Sheets on mobile.",
      displayOrder: 1,
    },
    {
      id: "tpl-faq-2",
      productId: "template",
      question: "I’m not good with Excel. Is it complicated?",
      answer:
        "Not at all. The template is guided and comes with a short demo/tutorial video. You mostly enter numbers — calculations and summaries happen automatically.",
      displayOrder: 2,
    },
    {
      id: "tpl-faq-3",
      productId: "template",
      question: "Can I customize categories and rows?",
      answer:
        "Yes. Everything is editable. You can rename categories, add rows, and tailor it to your workflow.",
      displayOrder: 3,
    },
    {
      id: "tpl-faq-4",
      productId: "template",
      question: "Do I get free updates?",
      answer:
        "Yes. When we improve a template, you’ll receive the updated version at no extra cost (per our update policy).",
      displayOrder: 4,
    },
  ],
  advanced_solution: [
    {
      id: "adv-faq-1",
      productId: "advanced_solution",
      question: "What exactly do I receive?",
      answer:
        "You receive the digital deliverable described on the product page (and any included documentation). If support is included, it will be stated clearly.",
      displayOrder: 1,
    },
    {
      id: "adv-faq-2",
      productId: "advanced_solution",
      question: "Is setup included?",
      answer:
        "The product includes a demo/guide video and clear instructions. If you need custom onboarding, contact support for options.",
      displayOrder: 2,
    },
    {
      id: "adv-faq-3",
      productId: "advanced_solution",
      question: "Can this be customized further?",
      answer:
        "Yes. Advanced solutions can be customized depending on your requirements. Reach out with details and we’ll advise the best approach.",
      displayOrder: 3,
    },
  ],
};

// ============================================
// GLOBAL FAQs
// ============================================

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getProductFaqs(): ProductFAQ[] {
  return [];
}

export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.isFeatured).sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getVideoTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.hasVideo);
}

export function getProductFaqsByType(productType: Product["productType"]): ProductFAQ[] {
  return (productFaqsByType[productType] || []).slice().sort((a, b) => a.displayOrder - b.displayOrder);
}

// ============================================
// SERVICES (Static)
// ============================================

export const servicesByProductType: Record<Product["productType"], Service[]> = {
  template: [
    {
      id: "custom-template-basic",
      name: "Custom Excel/Sheets Template",
      slug: "custom-excel-sheets-template",
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
  ],
  advanced_solution: [
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
  ],
};

export function getServicesByProductType(productType: Product["productType"]): Service[] {
  return servicesByProductType[productType] || [];
}

export function getAllServices(): Service[] {
  return [
    ...servicesByProductType.template,
    ...servicesByProductType.advanced_solution.filter(
      (s) => s.id !== "custom-template-advanced" // Avoid duplicate
    ),
  ];
}

// Get bundled products with full product objects



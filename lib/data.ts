// ============================================
// BudgetKE Complete Data
// Comprehensive product catalog with BestSelf-style content
// ============================================

import type { 
  Product, 
  Category, 
  Bundle, 
  Testimonial, 
  ProductFAQ,
  GlobalFAQ 
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

export const productFaqs: Record<string, ProductFAQ[]> = {
  "budget-master-pro": [
    {
      id: "bp-faq-1",
      productId: "budget-master-pro",
      question: "Will this work on my phone?",
      answer: "Yes! While the Excel version works best on desktop, the Google Sheets version is fully mobile-friendly. Download the Google Sheets app and you can add expenses on the go.",
      displayOrder: 1,
    },
    {
      id: "bp-faq-2",
      productId: "budget-master-pro",
      question: "I've never used Excel before. Is this too complicated?",
      answer: "Not at all! The template comes with a video tutorial that walks you through everything step by step. Most customers are up and running in under 15 minutes. You just need to type numbers — all calculations happen automatically.",
      displayOrder: 2,
    },
    {
      id: "bp-faq-3",
      productId: "budget-master-pro",
      question: "Can I customize the expense categories?",
      answer: "Absolutely! The template comes with pre-set Kenyan categories (rent, utilities, school fees, M-Pesa, etc.) but you can rename, add, or delete any category to match your specific situation.",
      displayOrder: 3,
    },
    {
      id: "bp-faq-5",
      productId: "budget-master-pro",
      question: "Do I get free updates?",
      answer: "Yes! When we release new versions of the Budget Planner, you'll receive an email with the download link at no extra cost. Your purchase includes lifetime updates.",
      displayOrder: 5,
    },
  ],
  "small-business-bookkeeper": [
    {
      id: "bb-faq-1",
      productId: "small-business-bookkeeper",
      question: "Do I need accounting knowledge to use this?",
      answer: "No! This template is designed for business owners, not accountants. We use simple terms and the included guide explains everything in plain language. If you can use WhatsApp, you can use this.",
      displayOrder: 1,
    },
    {
      id: "bb-faq-2",
      productId: "small-business-bookkeeper",
      question: "Can I use this for multiple businesses?",
      answer: "Each purchase covers one business. However, you can duplicate the file to track multiple businesses. For 3+ businesses, contact us about our multi-business license.",
      displayOrder: 2,
    },
    {
      id: "bb-faq-3",
      productId: "small-business-bookkeeper",
      question: "Does this work for VAT-registered businesses?",
      answer: "Yes! There's a dedicated VAT tracking section. You can record input and output VAT, and the template calculates your net VAT payable/refundable automatically.",
      displayOrder: 3,
    },
    {
      id: "bb-faq-4",
      productId: "small-business-bookkeeper",
      question: "Will my accountant be able to use the reports?",
      answer: "Definitely. The P&L and Balance Sheet follow standard accounting formats. Your accountant will appreciate the organized records when tax season comes.",
      displayOrder: 4,
    },
  ],
  "chamaa-manager": [
    {
      id: "cm-faq-1",
      productId: "chamaa-manager",
      question: "How many members can I track?",
      answer: "The template supports unlimited members. Whether you have 10 or 100 members, it scales to your group size.",
      displayOrder: 1,
    },
    {
      id: "cm-faq-2",
      productId: "chamaa-manager",
      question: "Can members view the records?",
      answer: "Yes! You can share the Google Sheets version with view-only access so members can see their balances and history without editing. This builds trust and transparency.",
      displayOrder: 2,
    },
    {
      id: "cm-faq-3",
      productId: "chamaa-manager",
      question: "Does it handle merry-go-round rotations?",
      answer: "Yes! There's a dedicated section for merry-go-round (rotating savings) that tracks who received their payout and who's next in the rotation.",
      displayOrder: 3,
    },
  ],
  "mtumba-dashboard": [
    {
      id: "mi-faq-1",
      productId: "mtumba-dashboard",
      question: "I sell online. Does this work for Instagram/TikTok Mtumba?",
      answer: "Absolutely! Whether you sell from Gikomba, a shop, or online, the tracking principles are the same. Log your bales, track individual pieces, and record sales from any channel.",
      displayOrder: 1,
    },
    {
      id: "mi-faq-2",
      productId: "mtumba-dashboard",
      question: "How do I track items from mixed bales?",
      answer: "The template has a 'bale breakdown' section where you categorize items as you unpack. You can track by type (jeans, t-shirts, dresses) and quality grade.",
      displayOrder: 2,
    },
  ],
};

// ============================================
// GLOBAL FAQs
// ============================================

export const globalFaqs: GlobalFAQ[] = [
  // Payment
  {
    id: "gf-1",
    category: "payment",
    question: "How do I pay?",
    answer: "We accept M-Pesa (Lipa na M-Pesa), Visa, Mastercard, and PayPal. M-Pesa is the easiest — just enter your phone number and approve the STK push on your phone.",
    displayOrder: 1,
    isFeatured: true,
  },
  {
    id: "gf-2",
    category: "payment",
    question: "Is my payment secure?",
    answer: "Absolutely. We use IntaSend, a licensed payment provider regulated by the Central Bank of Kenya. Your payment details are encrypted and never stored on our servers.",
    displayOrder: 2,
    isFeatured: true,
  },
  {
    id: "gf-3",
    category: "payment",
    question: "Can I pay with Airtel Money or T-Kash?",
    answer: "Currently we only support Safaricom M-Pesa for mobile payments. However, you can pay with any Visa or Mastercard from any bank.",
    displayOrder: 3,
    isFeatured: false,
  },
  // Downloads
  {
    id: "gf-4",
    category: "downloads",
    question: "How do I get my files after paying?",
    answer: "Immediately after payment, you'll receive an email with your download link. The link is also shown on the success page. You can download up to 5 times.",
    displayOrder: 1,
    isFeatured: true,
  },
  {
    id: "gf-5",
    category: "downloads",
    question: "What software do I need?",
    answer: "Our templates work on Microsoft Excel (2016 or later) or Google Sheets (free). Most templates also include a PDF version that works on any device.",
    displayOrder: 2,
    isFeatured: true,
  },
  {
    id: "gf-6",
    category: "downloads",
    question: "Can I use the templates on my phone?",
    answer: "Yes! Download the free Google Sheets app and open the Google Sheets version of your template. It works great on both Android and iPhone.",
    displayOrder: 3,
    isFeatured: false,
  },
  {
    id: "gf-7",
    category: "downloads",
    question: "How long do I have to download?",
    answer: "Your download link is valid for 30 days after purchase. We recommend downloading immediately and saving to Google Drive or your computer for safekeeping.",
    displayOrder: 4,
    isFeatured: false,
  },
  // Returns
  {
    id: "gf-8",
    category: "returns",
    question: "What's your refund policy?",
    answer: "Due to the digital nature of our products, we generally don't offer refunds once the file has been downloaded. However, if you have technical issues, contact us within 7 days and we'll help resolve them or issue a refund.",
    displayOrder: 1,
    isFeatured: true,
  },
  {
    id: "gf-9",
    category: "returns",
    question: "What if the template doesn't work for me?",
    answer: "If you're having trouble, email us at support@budgetke.com. We're happy to provide guidance, customization tips, or recommend a better-suited template. Most issues can be solved with a quick email exchange.",
    displayOrder: 2,
    isFeatured: false,
  },
  // General
  {
    id: "gf-10",
    category: "general",
    question: "Are these templates one-time purchases?",
    answer: "Yes! You pay once and own the template forever. There are no subscriptions, monthly fees, or hidden charges. You also get free updates for life.",
    displayOrder: 1,
    isFeatured: true,
  },
  {
    id: "gf-11",
    category: "general",
    question: "Can I share my template with others?",
    answer: "Your purchase is for personal or single-business use. Sharing with friends or colleagues requires them to purchase their own license. We keep prices low so everyone can afford their own copy.",
    displayOrder: 2,
    isFeatured: false,
  },
  {
    id: "gf-12",
    category: "general",
    question: "Do you offer custom templates?",
    answer: "Yes! For businesses needing custom templates, we offer bespoke development services starting at KES 15,000. Contact us at custom@budgetke.com with your requirements.",
    displayOrder: 3,
    isFeatured: false,
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getProductFaqs(productId: string): ProductFAQ[] {
  return productFaqs[productId] || [];
}

export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.isFeatured).sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getVideoTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.hasVideo);
}

export function getGlobalFaqsByCategory(category: GlobalFAQ["category"]): GlobalFAQ[] {
  return globalFaqs.filter((f) => f.category === category).sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getFeaturedGlobalFaqs(): GlobalFAQ[] {
  return globalFaqs.filter((f) => f.isFeatured);
}

// Get bundled products with full product objects



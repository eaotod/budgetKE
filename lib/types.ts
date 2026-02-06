// ============================================
// BudgetKE TypeScript Types
// Complete type definitions for the platform
// ============================================

import { z } from "zod";

// ============================================
// CATEGORY
// ============================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  icon?: string;
  parentId?: string;
  displayOrder: number;
  productCount: number;
  metaTitle?: string;
  metaDescription?: string;
}

export const categorySchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  icon: z.string().optional(),
  parentId: z.string().optional(),
  displayOrder: z.number().default(0),
});

// ============================================
// PRODUCT
// ============================================

export interface WhatYouGetItem {
  icon: string;
  title: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  category?: Category;
  
  // Pricing
  price: number;
  comparePrice?: number;
  currency: string;
  
  // Content
  shortDescription: string;
  description: string;
  whatYouGet: WhatYouGetItem[];
  detailsSpecs: string[];
  whyItWorks?: string;
  howToUse?: string;
  
  // Media
  images: string[];
  thumbnailUrl?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  
  // Stats
  rating: number;
  reviewCount: number;
  downloadCount: number;
  
  // Flags
  isFeatured: boolean;
  isBestseller: boolean;
  isNew: boolean;
  status: "active" | "draft" | "archived";
  
  // File
  fileUrl: string;
  fileName?: string;
  fileSize?: string;
  fileFormat?: string;
}

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  slug: z.string().min(1),
  categoryId: z.string(),
  price: z.number().positive(),
  comparePrice: z.number().positive().optional(),
  shortDescription: z.string(),
  description: z.string(),
});

// ============================================
// PRODUCT FAQ
// ============================================

export interface ProductFAQ {
  id: string;
  productId: string;
  question: string;
  answer: string;
  displayOrder: number;
}

// ============================================
// BUNDLE
// ============================================

export interface Bundle {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  productIds: string[];
  products?: Product[];
  originalPrice: number;
  bundlePrice: number;
  savings: number;
  images: string[];
  thumbnailUrl?: string;
  isFeatured: boolean;
  status: "active" | "draft" | "archived";
  metaTitle?: string;
  metaDescription?: string;
}

// ============================================
// ORDER
// ============================================

export interface OrderItem {
  productId: string;
  bundleId?: string;
  name: string;
  price: number;
  quantity: number;
  type: "product" | "bundle";
}

export interface Order {
  id: string;
  orderNumber: string;
  email: string;
  phone: string;
  customerName?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  currency: string;
  paymentMethod: "mpesa" | "card" | "paypal";
  paymentStatus: "pending" | "processing" | "completed" | "failed" | "refunded";
  paymentRef?: string;
  intasendInvoiceId?: string;
  intasendCheckoutId?: string;
  downloadToken?: string;
  downloadCount: number;
  maxDownloads: number;
  createdAt: string;
  paidAt?: string;
  expiresAt: string;
}

export const orderSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number").regex(/^254\d{9}$/, "Phone must be in format 254XXXXXXXXX"),
  customerName: z.string().optional(),
});

// ============================================
// REVIEW
// ============================================

export interface Review {
  id: string;
  productId: string;
  orderId?: string;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  authorLocation?: string;
  rating: number;
  title?: string;
  content: string;
  isVerified: boolean;
  isApproved: boolean;
  isFeatured: boolean;
  helpfulCount: number;
  adminResponse?: string;
  adminRespondedAt?: string;
  createdAt: string;
}

export const reviewSchema = z.object({
  productId: z.string(),
  authorName: z.string().min(2, "Name must be at least 2 characters"),
  authorEmail: z.string().email("Please enter a valid email"),
  authorLocation: z.string().optional(),
  rating: z.number().min(1).max(5),
  title: z.string().optional(),
  content: z.string().min(10, "Review must be at least 10 characters"),
});

// ============================================
// TESTIMONIAL
// ============================================

export interface Testimonial {
  id: string;
  authorName: string;
  authorTitle?: string;
  authorCompany?: string;
  authorLocation?: string;
  authorAvatar?: string;
  content: string;
  shortQuote?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  hasVideo: boolean;
  rating: number;
  isFeatured: boolean;
  displayOrder: number;
}

// ============================================
// NEWSLETTER
// ============================================

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  source: string;
  subscribedAt: string;
  isActive: boolean;
}

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  name: z.string().optional(),
});

// ============================================
// CONTACT MESSAGE
// ============================================

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  isRead: boolean;
  isResolved: boolean;
  createdAt: string;
}

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// ============================================
// GLOBAL FAQ
// ============================================

export interface GlobalFAQ {
  id: string;
  category: "general" | "payment" | "downloads" | "returns";
  question: string;
  answer: string;
  displayOrder: number;
  isFeatured: boolean;
}

// ============================================
// SERVICES
// ============================================

export interface Service {
  id: string;
  name: string;
  slug: string;
  tier: "basic" | "advanced" | "premium";
  priceMin: number;
  priceMax: number;
  currency: string;
  timeline?: string;
  shortDescription?: string;
  description?: string;
  features: string[];
  deliverables: string[];
  status: "active" | "draft";
}

// ============================================
// CART
// ============================================

export interface CartItem {
  id: string;
  type: "product" | "bundle";
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  total: number;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ============================================
// CHECKOUT
// ============================================

export interface CheckoutFormData {
  email: string;
  phone: string;
  customerName?: string;
}

export const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  phone: z.string()
    .min(12, "Phone must be 12 digits")
    .max(12, "Phone must be 12 digits")
    .regex(/^254[71]\d{8}$/, "Enter valid Safaricom number (254 7XX or 1XX)"),
  customerName: z.string().min(2, "Name must be at least 2 characters").optional(),
});

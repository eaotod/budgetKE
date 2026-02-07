import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { HowItWorks } from "@/components/sections/how-it-works";
import { FAQ } from "@/components/sections/faq";
import { NewsletterCTA } from "@/components/sections/newsletter-cta";

// ... [skipping middle sections for brevity if possible, but tool needs exact match]

export const metadata: Metadata = {
  title: "BudgetKE — Professional Financial Templates for Kenyans",
  description:
    "Kenya's #1 source for budget planners, bookkeeping tools, and financial templates. Track M-Pesa expenses, manage your business, and grow your savings. Instant download via M-Pesa.",
  keywords: [
    "budget planner Kenya",
    "Excel templates Kenya",
    "finance templates",
    "business bookkeeping Kenya",
    "M-Pesa expense tracker",
    "Google Sheets templates",
  ],
  openGraph: {
    title: "BudgetKE — Professional Financial Templates for Kenyans",
    description:
      "Kenya's #1 source for budget planners and financial templates. Track every shilling.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "BudgetKE",
    locale: "en_KE",
    type: "website",
  },
};

// Organization JSON-LD
function OrganizationJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://budget.ke";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BudgetKE",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "Kenya's leading provider of professional financial templates and budget planning tools.",
    foundingDate: "2024",
    founders: [
      {
        "@type": "Person",
        name: "BudgetKE Team",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "support@budgetke.com",
      availableLanguage: ["English", "Swahili"],
    },
    sameAs: [
      "https://facebook.com/budgetke",
      "https://instagram.com/budgetke",
      "https://twitter.com/budgetke",
      "https://youtube.com/budgetke",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Website JSON-LD with SearchAction
function WebsiteJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://budget.ke";

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BudgetKE",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/templates?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

import { getCategories, getProducts } from "@/lib/catalog";
import { CategoriesSection } from "@/components/sections/categories";
import { ProductsSection } from "@/components/sections/products-grid";
import { BlogSection } from "@/components/sections/blog-section";
import { getLatestBlogs } from "@/lib/blog";

export default async function HomePage() {
  const categories = getCategories();
  const products = getProducts({ status: "active" });

  return (
    <>
      <OrganizationJsonLd />
      <WebsiteJsonLd />

      <Navbar />

      <main className="mt-[112px]">
        {/* Hero Section */}
        <Hero />

        {/* Categories Section */}
        <CategoriesSection categories={categories} />

        {/* Unified Products Grid */}
        <ProductsSection products={products} categories={categories} />

        {/* How It Works */}
        <HowItWorks />

        {/* Wall of Love */}
        <SocialProof />

        {/* Blog Section */}
        <BlogSection blogs={getLatestBlogs(6)} />

        {/* FAQ */}
        <FAQ />

        {/* Newsletter CTA */}
        <NewsletterCTA />
      </main>

      <Footer />
    </>
  );
}

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs, BreadcrumbJsonLd } from "@/components/ui/breadcrumbs";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductDetails } from "@/components/product/product-tabs";
import { ReviewsSection } from "@/components/product/reviews-section";
import { ProductCard } from "@/components/ui/product-card";
import { FAQAccordion, FAQJsonLd } from "@/components/faq/faq-accordion";
import { VideoPlayer } from "@/components/ui/video-player";
import { AnimatedLabel } from "@/components/ui/animated-label";
import type { Product } from "@/lib/types";
import { getProductFaqsByType } from "@/lib/data";
import { getProductBySlug, getProducts } from "@/lib/catalog";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { getProductSlugs } = await import("@/lib/catalog/products");
  const slugs = getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    return {
      title: "Product Not Found | BudgetKE",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://budget.ke";
  const productUrl = `${baseUrl}/templates/${product.slug}`;

  return {
    title: product.metaTitle || `${product.name} | BudgetKE`,
    description: product.metaDescription || product.shortDescription,
    keywords: product.keywords,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      url: productUrl,
      siteName: "BudgetKE",
      images: product.thumbnailUrl
        ? [
            {
              url: product.thumbnailUrl,
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ]
        : [],
      locale: "en_KE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDescription,
      images: product.thumbnailUrl ? [product.thumbnailUrl] : [],
    },
    alternates: {
      canonical: productUrl,
    },
  };
}

// Product JSON-LD Schema
function ProductJsonLd({ product }: { product: Product }) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://budget.ke";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images,
    url: `${baseUrl}/templates/${product.slug}`,
    brand: {
      "@type": "Brand",
      name: "BudgetKE",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "KES",
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // eslint-disable-line react-hooks/purity
        .toISOString()
        .split("T")[0],
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "BudgetKE",
      },
    },
    aggregateRating:
      product.reviewCount > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    category: product.category?.name || product.categoryId,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProducts({
    status: "active",
    categoryId: product.categoryId,
  })
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const productWithCategory = {
    ...product,
    category: product.category,
  };

  const faqs = getProductFaqsByType(product.productType);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Templates", href: "/templates" },
    ...(product.category
      ? [
          {
            label: product.category.name,
            href: `/templates?category=${product.category.slug}`,
          },
        ]
      : []),
    { label: product.name },
  ];

  return (
    <>
      <ProductJsonLd product={productWithCategory} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      {faqs && faqs.length > 0 && <FAQJsonLd faqs={faqs} />}

      <Navbar />

      <main className="pb-20 lg:pb-32">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-100 pt-28 pb-8 lg:pb-12">
          <div className="max-w-6xl mx-auto px-6">
            {/* Breadcrumbs */}
            <Breadcrumbs items={breadcrumbItems} className="mb-12" />

            {/* Product header */}
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              {/* Gallery */}
              <ProductGallery
                images={product.images}
                productName={product.name}
                videoUrl={product.videoUrl}
                videoThumbnail={product.videoThumbnail}
              />

              {/* Info */}
              <ProductInfo product={productWithCategory} />
            </div>
          </div>
        </div>

        {/* Deep Details Section */}
        <div className="max-w-6xl mx-auto px-6 py-8 lg:py-12">
          <ProductDetails product={productWithCategory} />
        </div>

        {/* Product video demo */}
        <section className="py-8 lg:py-16 bg-gray-50/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 lg:mb-24">
              <AnimatedLabel>
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Live Action
              </AnimatedLabel>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
                Experience it in action
              </h2>
            </div>

            {product.videoUrl ? (
              <div className="max-w-4xl mx-auto">
                <div className="aspect-video w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-200/50 group relative">
                  <VideoPlayer
                    videoUrl={product.videoUrl}
                    thumbnailUrl={product.videoThumbnail}
                    title={`${product.name} Demo`}
                    mode="inline"
                  />
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                <div className="aspect-video w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-200/50 bg-gray-100 flex items-center justify-center">
                  <p className="text-gray-400 font-medium">
                    Video demo coming soon
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Product FAQs (static by product type) */}
        {faqs && faqs.length > 0 && (
          <section className="py-8 lg:py-16 border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16 lg:mb-24">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest mb-6">
                  Common Questions
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
                  Everything you need to know
                </h2>
              </div>

              <div className="max-w-3xl mx-auto">
                <FAQAccordion faqs={faqs} />
              </div>
            </div>
          </section>
        )}

        {/* Reviews Section */}
        <div className="py-8 lg:py-16 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-6">
            <ReviewsSection product={productWithCategory} />
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="py-8 lg:py-16 bg-gray-50/50">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16 lg:mb-24">
                <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
                  Complete your system
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

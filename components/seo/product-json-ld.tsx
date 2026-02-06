import { Product, WithContext } from "schema-dts";

interface ProductJsonLdProps {
  product: {
    name: string;
    description: string;
    image: string;
    price: number;
    currency?: string;
    rating?: number;
    reviewCount?: number;
    brand?: string;
  };
}

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const jsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      "@type": "Brand",
      name: product.brand || "BudgetKE",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency || "KES",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount || 0,
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

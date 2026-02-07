import { MetadataRoute } from "next";
import { getBlogSlugs } from "@/lib/blog";
import { getProductSlugs } from "@/lib/catalog/products";
import { getBundles } from "@/lib/catalog";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://budget.ke";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productSlugs = getProductSlugs();
  const productUrls = productSlugs.map((slug) => ({
    url: `${baseUrl}/templates/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const bundles = getBundles({ status: "active" });
  const bundleUrls = bundles.map((b) => ({
    url: `${baseUrl}/bundles/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const blogSlugs = getBlogSlugs();
  const blogUrls = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug.replace(/\.mdx$/, "")}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...productUrls,
    ...bundleUrls,
    ...blogUrls,
  ];
}

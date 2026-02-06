import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/client";
import { getBlogSlugs } from "@/lib/blog";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://budget.ke"; // Fallback for dev

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();
  
  // 1. Dynamic Product URLs
  const { data: products } = await supabase.from("products").select("slug").eq("status", "active");
  const productUrls = products?.map((product) => ({
    url: `${baseUrl}/templates/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  })) || [];

  // 2. Dynamic Blog URLs
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
    ...blogUrls,
  ];
}

import { getBlogPostBySlug, getBlogPosts, getRelatedPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";
import { ProductCta } from "@/components/blog/product-cta";
import { BlogCard } from "@/components/blog/blog-card";
import { getProductBySlug } from "@/lib/catalog";

// Force static generation
export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://budget.ke";
  return {
    title: `${post.title} | BudgetKE Blog`,
    description: post.excerpt,
    openGraph: {
      images: [
        post.image.startsWith("http") ? post.image : `${baseUrl}${post.image}`,
      ],
      type: "article",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category);
  const recommendedSlugs = post.productLinks?.length
    ? post.productLinks
    : post.productLink
      ? [post.productLink]
      : [];
  const recommendedProducts = recommendedSlugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://budget.ke";
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image.startsWith("http")
      ? post.image
      : `${baseUrl}${post.image}`,
    datePublished: post.date,
    author: { "@type": "Organization", name: "BudgetKE" },
    publisher: {
      "@type": "Organization",
      name: "BudgetKE",
      logo: { "@type": "ImageObject", url: `${baseUrl}/images/logo.svg` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />
      <main className="bg-white pt-32 pb-24">
        {/* Hero */}
        <div className="max-w-4xl mx-auto px-6 mb-16 text-center space-y-8">
          <div className="flex items-center justify-center gap-4">
            {post.category && (
              <span className="px-4 py-2 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                {post.category.replace("-", " ")}
              </span>
            )}
            {post.readTime && (
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {post.readTime} Read
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
              Published {post.date}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-6xl mx-auto px-6 mb-20">
          <div className="relative aspect-21/9 rounded-[2.5rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-lg shadow-gray-200/20">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <article className="max-w-4xl mx-auto px-6 prose prose-xl prose-slate prose-headings:font-black prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-[2rem] prose-p:leading-relaxed prose-p:text-gray-600 prose-li:text-gray-600">
          <MDXRemote
            source={post.content}
            components={{
              ProductCta,
            }}
          />
        </article>

        {/* Recommended products */}
        {recommendedProducts.length > 0 && (
          <section className="mt-24 border-t border-gray-100 pt-24">
            <div className="max-w-4xl mx-auto px-6 space-y-10">
              <h2 className="text-2xl font-black text-gray-900">
                Recommended for you
              </h2>
              <div className="space-y-8">
                {recommendedProducts.map((product) => (
                  <ProductCta
                    key={product.id}
                    productId={product.slug}
                    title={product.name}
                    description={product.shortDescription}
                    image={
                      product.thumbnailUrl ??
                      product.images?.[0] ??
                      "/images/blogs/default-cover.jpg"
                    }
                    price={product.price}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-40 border-t border-gray-100 pt-24 bg-gray-50/50">
            <div className="max-w-6xl mx-auto px-6 space-y-16">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                  You might also like
                </h2>
                <p className="text-gray-500 font-medium">
                  Continue reading our expert guides.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-10">
                {relatedPosts.map((p) => (
                  <BlogCard key={p.slug} post={p} />
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

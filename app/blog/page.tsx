import { getBlogPosts } from "@/lib/blog";
import { FeaturedPost } from "@/components/blog/featured-post";
import { BlogCard } from "@/components/blog/blog-card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

// Force static generation
export const dynamic = "force-static";

export const metadata = {
  title: "Blog - Expert Tips for Finance & Business | BudgetKE",
  description:
    "Helpful articles, guides, and stories to help you manage your finances and build your business.",
};

export default function BlogPage() {
  const allPosts = getBlogPosts();
  const featuredPost = allPosts.find((p) => p.featured) || allPosts[0];
  const regularPosts = allPosts.filter((p) => p.slug !== featuredPost.slug);

  // Group by category
  const categories = [
    { id: "personal-finance", label: "Personal Finance" },
    { id: "business-tools", label: "Business Tools" },
    { id: "industry-specific", label: "Industry Specific" },
    { id: "advanced-solutions", label: "Advanced Solutions" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-32 pb-32">
        <div className="max-w-6xl mx-auto px-6 space-y-24">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight">
              The BudgetKE Blog
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
              Whether you&apos;re managing personal finances or growing a
              business, our blog is filled with helpful guides and strategies.
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && <FeaturedPost post={featuredPost} />}

          {/* Categories */}
          <div className="space-y-24">
            {categories.map((category) => {
              const categoryPosts = regularPosts.filter(
                (post) => post.category === category.id,
              );

              if (categoryPosts.length === 0) return null;

              return (
                <section key={category.id} className="space-y-10">
                  <div className="flex items-end justify-between border-b border-gray-200 pb-6">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                      {category.label}
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryPosts.map((post) => (
                      <BlogCard key={post.slug} post={post} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

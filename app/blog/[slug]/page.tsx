import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getBlogBySlug, getBlogSlugs, getLatestBlogs } from "@/lib/blog";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Calendar, Clock, ChevronRight, ArrowLeft } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    return { title: "Blog Post Not Found | BudgetKE" };
  }

  return {
    title: `${blog.title} | BudgetKE Blog`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  const relatedPosts = getLatestBlogs(3).filter((p) => p.slug !== blog.slug);

  const breadcrumbItems = [
    { label: "Blog", href: "/blog" },
    { label: blog.title },
  ];

  return (
    <>
      <Navbar />
      <main className="md:pt-32 pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <Breadcrumbs items={breadcrumbItems} className="mb-12" />

          <article>
            <div className="mb-12">
              <div className="text-primary text-xs font-black uppercase tracking-[0.2em] mb-6 inline-block bg-primary/5 px-4 py-2 rounded-full">
                {blog.categoryName || blog.category}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight leading-[1.1]">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm font-medium border-y border-gray-100 py-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  {new Date(blog.date).toLocaleDateString("en-KE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  {blog.readingTime}
                </div>
              </div>
            </div>

            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-16 border border-gray-100 shadow-2xl shadow-gray-200/50">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content (Simplified for now - can use next-mdx-remote later) */}
            <div className="prose prose-lg prose-green max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:text-gray-600 prose-p:leading-relaxed">
              {/* This is a simple fallback. Real MDX rendering requires a library like next-mdx-remote */}
              <div
                dangerouslySetInnerHTML={{
                  __html: blog.content.replace(/\n/g, "<br/>"),
                }}
              />
            </div>

            <div className="mt-20 pt-12 border-t border-gray-100">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-gray-900 font-bold hover:text-primary transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                Back to Blog
              </Link>
            </div>
          </article>
        </div>

        {/* Related Posts */}
        <section className="mt-32 py-24 bg-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-3xl font-black text-gray-900 mb-12 tracking-tight">
              Keep Reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 bg-white border border-gray-100 shadow-sm">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

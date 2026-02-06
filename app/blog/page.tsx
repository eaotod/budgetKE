import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getAllBlogs } from "@/lib/blog";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = {
  title: "Finance & Budgeting Blog | BudgetKE Insights",
  description:
    "Learn how to manage your money, track expenses, and grow your business in Kenya.",
};

export default function BlogPage() {
  const blogs = getAllBlogs();

  const breadcrumbItems = [{ label: "Blog", href: "/blog" }];

  return (
    <>
      <Navbar />
      <main className="md:pt-32 pt-28 pb-20 bg-gray-50/50 min-h-screen">
        <div className="container mx-auto px-6 max-w-7xl">
          <Breadcrumbs items={breadcrumbItems} className="mb-8" />

          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              BudgetKE <span className="text-primary">Journal</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
              Insights, guides, and tips to help you master your finances and
              grow your business in the Kenyan landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {blogs.map((blog) => (
              <article key={blog.id} className="flex flex-col group">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="block relative aspect-16/10 overflow-hidden rounded-[2rem] mb-6 bg-gray-50 border border-gray-100 transition-all hover:shadow-xl hover:shadow-gray-200/50"
                >
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>

                <div className="flex flex-col">
                  <div className="text-primary text-[11px] font-black uppercase tracking-[0.2em] mb-3">
                    {blog.categoryName || blog.category}
                  </div>

                  <Link href={`/blog/${blog.slug}`}>
                    <h2 className="text-2xl font-bold text-gray-900 leading-tight hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                  </Link>

                  <p className="mt-4 text-gray-500 text-sm line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

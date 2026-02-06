import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";

export function BlogSection({ blogs }: { blogs: BlogPost[] }) {
  return (
    <section id="blog" className="py-20 lg:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Centered Heading */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-center max-w-[670px] mx-auto">
            Learn about personal finance, budgeting & entrepreneurship
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {blogs.map((blog) => {
            const categoryName =
              (blog as any).categoryName || "Personal Finance";

            return (
              <article key={blog.id} className="flex flex-col group">
                {/* Simplified Image Container */}
                <Link
                  href={`/blog/${blog.slug}`}
                  className="block relative aspect-16/10 overflow-hidden rounded-2xl mb-6 bg-gray-50 transition-opacity hover:opacity-90"
                >
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </Link>

                {/* Minimalist Content Stack */}
                <div className="flex flex-col">
                  <div className="text-primary text-[11px] font-bold uppercase tracking-[0.1em] mb-3 transition-colors">
                    {categoryName}
                  </div>

                  <Link href={`/blog/${blog.slug}`}>
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

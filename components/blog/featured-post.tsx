import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

export function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <div className="group relative rounded-[2.5rem] bg-white border border-gray-100 p-6 md:p-8 hover:shadow-lg hover:shadow-gray-200/20 transition-all duration-300">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Image */}
        <div className="relative aspect-16/10 lg:aspect-square overflow-hidden rounded-3xl bg-gray-50">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-black uppercase tracking-widest rounded-full">
              Featured
            </span>
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wide">
              {post.readTime} Read
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 leading-[1.2] tracking-tight group-hover:text-primary transition-colors">
            <Link
              href={`/blog/${post.slug}`}
              className="before:absolute before:inset-0"
            >
              {post.title}
            </Link>
          </h2>

          <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 pt-2">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Published {post.date}
            </div>
          </div>

          <div className="pt-2">
            <span className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs group-hover:translate-x-1 transition-transform">
              Read Article <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

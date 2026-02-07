import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-5">
      <div className="relative aspect-16/10 overflow-hidden rounded-[2rem] bg-gray-50 border border-gray-100 group-hover:shadow-md group-hover:shadow-gray-200/20 transition-all duration-300">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
          <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">
            {post.readTime}
          </span>
        </div>
      </div>

      <div className="space-y-3 px-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
          <span>{post.date}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm text-gray-500 font-medium line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}

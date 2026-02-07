import Link from "next/link";
import Image from "next/image";

import { Category } from "@/lib/types";

export function CategoriesSection({ categories }: { categories: Category[] }) {
  return (
    <section className="py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {categories.map((category) => {
            const image = `/images/categories/${category.slug}.webp`;

            return (
              <div key={category.id} className="group">
                <Link
                  href={`/templates?category=${category.slug}`}
                  className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-gray-50/50 border border-border/50 hover:bg-white hover:shadow-xl hover:shadow-gray-200/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <Image
                      src={image}
                      alt={category.name}
                      width={64}
                      height={64}
                      className="rounded-full object-contain transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                    />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 text-center transition-colors group-hover:text-primary">
                    {category.name}
                  </h3>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import * as HugeIcons from "@hugeicons/core-free-icons";
import { File01Icon, Tick01Icon } from "@hugeicons/core-free-icons";
import type { Product, WhatYouGetItem } from "@/lib/types";

// Dynamic icon component mapping
function DynamicIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const iconName = name
    .replace("Package", "PackageIcon")
    .replace("ListChecks", "CheckListIcon")
    .replace("Lightbulb", "BulbIcon")
    .replace("BookOpen", "BookOpen01Icon")
    .replace("Zap", "ZapIcon")
    .replace("Shield", "Shield01Icon") as keyof typeof HugeIcons;

  const Icon = HugeIcons[iconName] || File01Icon;
  return <HugeiconsIcon icon={Icon} className={className} />;
}

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const hasFeatures = product.whatYouGet && product.whatYouGet.length > 0;
  const hasSpecs = product.detailsSpecs && product.detailsSpecs.length > 0;

  if (!hasFeatures && !hasSpecs) {
    return null;
  }

  return (
    <div className="space-y-12">
      {/* Key Features Section */}
      {hasFeatures && (
        <section>
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
              What's Included
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              Everything you need to succeed
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
            {product.whatYouGet.map((item: WhatYouGetItem, index: number) => (
              <div
                key={index}
                className="flex gap-5 p-6 bg-white rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                  <DynamicIcon
                    name={item.icon}
                    className="w-7 h-7 text-primary"
                  />
                </div>
                <div className="pt-1">
                  <h4 className="text-lg font-black text-gray-900 mb-2 tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 leading-relaxed font-medium text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Specs Section */}
      {hasSpecs && (
        <section>
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest mb-4">
              Technical Details
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              Built for real-world use
            </h2>
          </div>

          <div className="bg-linear-to-br from-gray-50 to-gray-100/50 rounded-[2.5rem] p-8 lg:p-12 border border-gray-100">
            <ul className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {product.detailsSpecs.map((spec, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 text-gray-700"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <HugeiconsIcon
                      icon={Tick01Icon}
                      size={14}
                      className="text-primary"
                    />
                  </div>
                  <span className="font-bold text-sm leading-relaxed">
                    {spec}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

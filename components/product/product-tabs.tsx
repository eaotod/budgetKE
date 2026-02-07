"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import * as HugeIcons from "@hugeicons/core-free-icons";
import {
  File01Icon,
  Tick01Icon,
  Package01Icon,
} from "@hugeicons/core-free-icons";
import type { Product, WhatYouGetItem } from "@/lib/types";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Helper to get helper icon path based on title keywords
function getFeatureIcon(title: string) {
  const lowerTitle = title.toLowerCase();

  // 1. Files / Docs
  if (
    lowerTitle.includes("guide") ||
    lowerTitle.includes("documentation") ||
    lowerTitle.includes("pdf") ||
    lowerTitle.includes("instruction")
  ) {
    return null; // Will fallback to default File01Icon in main component logic if we want, OR we can return a specific path if we have SVGs.
    // Actually looking at the code below, it tries to render an Image if this returns a path, otherwise a HugeIcon.
    // The prompt says "Quick Start Guide should just be a document icons since its documentation rather than vidoe".
    // If I return null here, it falls back to lines 185-189:
    /*
        } else {
           <HugeiconsIcon icon={Package01Icon} ... /> 
        }
     */
    // Wait, I should probably modify the component to handle specific icons via HugeIcons if no image path is found.
    // OR I can just map to a branded SVG if I have one.
    // But the user wants a "document icon".
    return null;
  }

  // 2. Excel / Sheets specific
  if (lowerTitle.includes("excel")) return "/images/icons/excel.svg";
  if (lowerTitle.includes("sheet")) return "/images/icons/sheets.svg";

  // 3. Video only if explicitly video
  if (lowerTitle.includes("video") || lowerTitle.includes("watch"))
    return "/images/icons/youtube.svg";

  return null;
}

// Dynamic icon component mapping
function DynamicIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  // Check for specific keywords to use branded SVGs
  const lowerName = name.toLowerCase();

  if (lowerName.includes("excel") || lowerName.includes("spreadsheet")) {
    return (
      <div
        className={cn(
          "relative w-8 h-8",
          className?.replace("w-6 h-6", "").replace("text-primary", ""),
        )}
      >
        <Image
          src="/images/icons/excel.svg"
          alt="Excel"
          fill
          className="object-contain"
        />
      </div>
    );
  }

  if (lowerName.includes("sheet") || lowerName.includes("google")) {
    return (
      <div
        className={cn(
          "relative w-8 h-8",
          className?.replace("w-6 h-6", "").replace("text-primary", ""),
        )}
      >
        <Image
          src="/images/icons/sheets.svg"
          alt="Google Sheets"
          fill
          className="object-contain"
        />
      </div>
    );
  }

  if (
    lowerName.includes("video") ||
    lowerName.includes("youtube") ||
    lowerName.includes("tutorial")
  ) {
    return (
      <div
        className={cn(
          "relative w-8 h-8",
          className?.replace("w-6 h-6", "").replace("text-primary", ""),
        )}
      >
        <Image
          src="/images/icons/youtube.svg"
          alt="Video Tutorial"
          fill
          className="object-contain"
        />
      </div>
    );
  }

  const iconName = name
    .replace("Package", "PackageIcon")
    .replace("ListChecks", "CheckListIcon")
    .replace("Lightbulb", "BulbIcon") // Keep existing
    .replace("BookOpen", "BookOpen01Icon") // Keep existing
    .replace("Zap", "ZapIcon") // Keep existing
    .replace("Shield", "Shield01Icon") // Keep existing
    .replace("Video", "Video01Icon") // Added
    .replace("FileSpreadsheet", "File01Icon") // Added
    .replace("Smartphone", "SmartPhone01Icon") as keyof typeof HugeIcons; // Added

  const IconComponent = HugeIcons[iconName] || File01Icon;

  return <HugeiconsIcon icon={IconComponent} className={className} />;
}

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  // Check if product uses new template system
  const hasNewFormat =
    product.whatsIncluded && product.whatsIncluded.length > 0;

  // Fallback to legacy format
  const hasLegacyFeatures = product.whatYouGet && product.whatYouGet.length > 0;
  const hasLegacySpecs =
    product.detailsSpecs && product.detailsSpecs.length > 0;

  if (!hasNewFormat && !hasLegacyFeatures && !hasLegacySpecs) {
    return null;
  }

  return (
    <div className="space-y-12">
      {/* Description Section */}
      {product.description && (
        <section>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest mb-4">
              Overview
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              What you&apos;ll get
            </h2>
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed font-medium">
              {product.description}
            </p>
          </div>
        </section>
      )}

      {/* What's Included Section (New Format) */}
      {hasNewFormat && (
        <section>
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
              What&apos;s Included
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              Everything you need to succeed
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {product.whatsIncluded!.map((item: string, index: number) => {
              // Parse "Title - Description" format
              const parts = item.split(" - ");
              const title = parts[0];
              const description = parts.slice(1).join(" - ") || "";

              const iconPath = getFeatureIcon(title);

              return (
                <div
                  key={index}
                  className="flex gap-5 p-6 bg-white rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300 overflow-hidden">
                    {iconPath ? (
                      <div className="relative w-6 h-6 shrink-0 mt-0.5">
                        <Image
                          src={iconPath}
                          alt={title}
                          fill
                          className="object-contain" // Use contain to keep aspect ratio
                        />
                      </div>
                    ) : (
                      <HugeiconsIcon
                        icon={
                          title.toLowerCase().includes("guide") ||
                          title.toLowerCase().includes("documentation") ||
                          title.toLowerCase().includes("instructions") ||
                          title.toLowerCase().includes("pdf")
                            ? File01Icon
                            : title.toLowerCase().includes("dashboard")
                              ? Package01Icon // Or other layout icon
                              : title.toLowerCase().includes("automation")
                                ? HugeIcons.ZapIcon
                                : title.toLowerCase().includes("database")
                                  ? HugeIcons.Database01Icon
                                  : Package01Icon
                        }
                        className="w-7 h-7 text-primary"
                      />
                    )}
                  </div>
                  <div className="pt-1">
                    <h4 className="text-lg font-black text-gray-900 mb-2 tracking-tight">
                      {title}
                    </h4>
                    {description && (
                      <p className="text-gray-500 leading-relaxed text-sm font-medium">
                        {description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Features Section (New Format) */}
      {product.features && product.features.length > 0 && (
        <section>
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4">
              Features
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              Powerful features built-in
            </h2>
          </div>

          <div className="bg-linear-to-br from-gray-50 to-gray-100/50 rounded-[2.5rem] p-8 lg:p-12 border border-gray-100">
            <ul className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {product.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 text-gray-700"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <HugeiconsIcon
                      icon={Tick01Icon}
                      size={14}
                      className="text-primary"
                    />
                  </div>
                  <span className="font-bold text-sm leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Requirements Section (New Format) */}
      {product.requirements && product.requirements.length > 0 && (
        <section>
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-4">
              Requirements
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              What you&apos;ll need
            </h2>
          </div>

          <div className="bg-linear-to-br from-orange-50 to-orange-100/50 rounded-[2.5rem] p-8 lg:p-12 border border-orange-100">
            <ul className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {product.requirements.map((requirement, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4 text-gray-700"
                >
                  <div className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <HugeiconsIcon
                      icon={Tick01Icon}
                      size={14}
                      className="text-orange-600"
                    />
                  </div>
                  <span className="font-bold text-sm leading-relaxed">
                    {requirement}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Technical Details Section (New Format) */}
      {product.technicalDetails &&
        Object.keys(product.technicalDetails).length > 0 && (
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
              <dl className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                {Object.entries(product.technicalDetails).map(
                  ([key, value]) => (
                    <div key={key} className="flex flex-col gap-2">
                      <dt className="text-xs font-black text-gray-500 uppercase tracking-widest">
                        {key.replace(/_/g, " ")}
                      </dt>
                      <dd className="text-sm font-bold text-gray-900">
                        {value}
                      </dd>
                    </div>
                  ),
                )}
              </dl>
            </div>
          </section>
        )}

      {/* Legacy Format - Key Features Section */}
      {!hasNewFormat && hasLegacyFeatures && (
        <section>
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
              What&apos;s Included
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
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
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

      {/* Legacy Format - Technical Specs Section */}
      {!hasNewFormat && hasLegacySpecs && (
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
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
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

import React from "react";
import NextImage from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Download01Icon, Video01Icon } from "@hugeicons/core-free-icons";
import { Search } from "@/components/ui/search";

const trustBadges = [
  {
    type: "image",
    src: "/images/icons/mpesa.svg",
    label: "M-Pesa Ready",
  },
  {
    type: "images",
    srcs: ["/images/icons/excel.svg", "/images/icons/sheets.svg"],
    label: "Excel & Sheets",
  },
  {
    type: "icon",
    icon: Download01Icon,
    label: "Instant Download",
  },
  {
    type: "icon",
    icon: Video01Icon,
    label: "Video Guides",
  },
];

export function Hero() {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-1/4 w-1/3 h-1/3 bg-green-50/30 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-1/4 w-1/4 h-1/4 bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h1 className="mb-8">
            Automate Your <br />
            Finances in{" "}
            <span className="relative whitespace-nowrap">
              <span className="absolute -top-1 -right-2 -bottom-1 -left-2 -rotate-4 bg-[#ffcf88]/50 md:top-0 md:-right-3 md:-bottom-0 md:-left-3" />
              <span className="text-neutral relative">Seconds.</span>
            </span>
          </h1>

          <p className="p-large mb-12 max-w-2xl mx-auto">
            Everything you need to manage your retail shop or personal budget in
            one place. Ready-made Excel & Google Sheets templates that actually
            work.
          </p>

          <div className="w-full max-w-2xl relative mb-12 group">
            <div className="absolute inset-0 bg-primary/10 rounded-[2.5rem] blur-2xl group-hover:bg-primary/20 transition-all duration-500 -z-10" />
            <React.Suspense
              fallback={
                <div className="h-14 bg-white/50 animate-pulse rounded-[2.5rem]" />
              }
            >
              <Search variant="large" />
            </React.Suspense>
          </div>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10 pt-4">
            {trustBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center p-2 border border-gray-100 group hover:border-primary/20 transition-all">
                  {badge.type === "icon" ? (
                    <HugeiconsIcon
                      icon={badge.icon!}
                      className="w-5 h-5 text-gray-700"
                    />
                  ) : badge.type === "image" ? (
                    <NextImage
                      src={badge.src!}
                      alt={badge.label}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain grayscale opacity-70"
                    />
                  ) : (
                    <div className="flex -space-x-2">
                      {badge.srcs?.map((src, sIdx) => (
                        <NextImage
                          key={sIdx}
                          src={src}
                          alt={`${badge.label} ${sIdx + 1}`}
                          width={24}
                          height={24}
                          className="w-6 h-6 object-contain grayscale opacity-70"
                        />
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest text-gray-500">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

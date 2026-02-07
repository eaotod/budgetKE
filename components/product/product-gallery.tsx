"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlayIcon, ViewIcon } from "@hugeicons/core-free-icons";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  videoUrl?: string;
  videoThumbnail?: string;
}

export function ProductGallery({
  images,
  productName,
  videoUrl,
  videoThumbnail,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Combine video thumbnail with images if video exists
  const allMedia =
    videoUrl && videoThumbnail
      ? [
          { type: "video" as const, url: videoThumbnail, videoUrl },
          ...images.map((url) => ({ type: "image" as const, url })),
        ]
      : images.map((url) => ({ type: "image" as const, url }));

  // Fallback if no images
  if (allMedia.length === 0) {
    return (
      <div className="aspect-square bg-gray-50 rounded-[2.5rem] flex items-center justify-center border border-dashed border-gray-200">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <HugeiconsIcon
              icon={ViewIcon}
              size={32}
              className="text-gray-300"
            />
          </div>
          <span className="text-gray-400 font-medium">
            No preview available
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Preview */}
      <div
        className="relative aspect-square bg-white rounded-[2.5rem] overflow-hidden group border border-gray-100/50 shadow-sm"
        onMouseMove={(e) => {
          if (allMedia[activeIndex]?.type === "video") return;
          const { left, top, width, height } =
            e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - left) / width) * 100;
          const y = ((e.clientY - top) / height) * 100;
          e.currentTarget.style.setProperty("--x", `${x}%`);
          e.currentTarget.style.setProperty("--y", `${y}%`);
        }}
        style={
          {
            "--x": "50%",
            "--y": "50%",
          } as React.CSSProperties
        }
      >
        {allMedia[activeIndex]?.type === "video" ? (
          <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
            {videoThumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={videoThumbnail}
                alt="Video thumbnail"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity group-hover:opacity-40" />

            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                <HugeiconsIcon
                  icon={PlayIcon}
                  size={28}
                  className="ml-1 fill-current"
                />
              </div>
              <p className="text-white font-bold text-sm uppercase tracking-widest drop-shadow-md">
                Watch Demo Video
              </p>
            </div>
          </div>
        ) : allMedia[activeIndex]?.url ? (
          <div className="w-full h-full cursor-zoom-in">
            <Zoom>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={allMedia[activeIndex].url}
                alt={`${productName} - Image ${activeIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-150 origin-[var(--x)_var(--y)]"
              />
            </Zoom>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <HugeiconsIcon
                  icon={ViewIcon}
                  size={32}
                  className="text-gray-300"
                />
              </div>
              <span className="text-gray-400 font-bold">{productName}</span>
            </div>
          </div>
        )}

        {/* Badge Indicator */}
        <div className="absolute top-6 left-6 z-20 pointer-events-none">
          <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest text-gray-900 shadow-sm">
            {allMedia[activeIndex]?.type === "video"
              ? "Demo"
              : `Image ${activeIndex + 1} / ${allMedia.length}`}
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      {allMedia.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-4 px-1 scrollbar-hide">
          {allMedia.map((media, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 border transition-all duration-300",
                activeIndex === index
                  ? "border-primary ring-4 ring-primary/10 scale-95"
                  : "border-gray-100 hover:border-gray-300 opacity-60 hover:opacity-100",
              )}
            >
              {media.type === "video" ? (
                <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
                  {videoThumbnail && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={videoThumbnail}
                      alt="Thumbnail video"
                      className="absolute inset-0 w-full h-full object-cover opacity-50"
                    />
                  )}
                  <div className="relative z-10 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                    <HugeiconsIcon
                      icon={PlayIcon}
                      size={14}
                      className="ml-0.5 fill-current"
                    />
                  </div>
                </div>
              ) : media.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={media.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                  <HugeiconsIcon
                    icon={ViewIcon}
                    size={20}
                    className="text-gray-300"
                  />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

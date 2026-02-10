"use client";

import { useState } from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, PlayIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface VideoPlayerProps {
  videoUrl?: string | null;
  thumbnailUrl?: string;
  title?: string;
  className?: string;
  aspectRatio?: "video" | "square";
  mode?: "modal" | "inline";
}

export function VideoPlayer({
  videoUrl,
  thumbnailUrl,
  title = "Video",
  className,
  aspectRatio = "video",
  mode = "modal",
}: VideoPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url: string | null | undefined): string => {
    if (!url) return "";
    let embedUrl = url;

    if (url.includes("youtube.com/watch")) {
      const videoId = new URL(url).searchParams.get("v");
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("youtu.be")) {
      const videoId = url.split("/").pop();
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes("vimeo.com")) {
      const videoId = url.split("/").pop();
      embedUrl = `https://player.vimeo.com/video/${videoId}`;
    }

    // Add autoplay param if we're opening it
    return `${embedUrl}?autoplay=1`;
  };

  // Don't render if no video URL
  if (!videoUrl) {
    return null;
  }

  const embedUrl = getEmbedUrl(videoUrl);

  if (mode === "inline") {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl bg-transparent",
          aspectRatio === "video" ? "aspect-video" : "aspect-square",
          className,
        )}
      >
        <iframe
          src={getEmbedUrl(videoUrl).replace("?autoplay=1", "")} // Remove autoplay for inline initial render
          title={title}
          className="w-full h-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // Modal mode (default)
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "relative group w-full overflow-hidden rounded-xl bg-gray-100 cursor-pointer block",
          aspectRatio === "video" ? "aspect-video" : "aspect-square",
          className,
        )}
      >
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <span className="text-gray-400 text-sm">{title}</span>
          </div>
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
            <HugeiconsIcon
              icon={PlayIcon}
              className="w-8 h-8 md:w-10 md:h-10 text-gray-900 ml-1"
            />
          </div>
        </div>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black border-none">
          <VisuallyHidden>
            <DialogTitle>{title}</DialogTitle>
          </VisuallyHidden>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-50"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="w-8 h-8" />
          </button>
          <div className="aspect-video w-full">
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

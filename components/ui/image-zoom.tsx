"use client";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageZoomProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
}

export function ImageZoom({
  src,
  alt,
  width = 600,
  height = 400,
  className,
  fill = false,
  priority = false,
}: ImageZoomProps) {
  return (
    <Zoom>
      {fill ? (
        <div className={cn("relative w-full h-full", className)}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn("object-cover", className)}
          priority={priority}
        />
      )}
    </Zoom>
  );
}

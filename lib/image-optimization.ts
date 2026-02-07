/**
 * Image Optimization Utilities
 * 
 * Client-side image compression, thumbnail generation, and format conversion.
 * Uses browser-image-compression for efficient image processing.
 */

import imageCompression from "browser-image-compression";
import { uploadFile as uploadToStorage, getPublicUrl as getStorageUrl, deleteFile as deleteFromStorage } from "@/lib/supabase/storage";

/**
 * Thumbnail sizes for different use cases
 */
export const THUMBNAIL_SIZES = {
  SMALL: 150,   // List views, cards
  MEDIUM: 400,  // Grid views
  LARGE: 800,   // Detail views
  XLARGE: 1200, // Full-screen views
} as const;

export interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  quality?: number;
  useWebWorker?: boolean;
}

export interface CompressionResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
}

export interface ThumbnailResult {
  size: number;
  file: File;
  url?: string;
}

/**
 * Compress an image file
 * 
 * @param file - The image file to compress
 * @param options - Compression options
 * @returns Compression result with file and metrics
 */
export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<CompressionResult> {
  const {
    maxSizeMB = 2,
    maxWidthOrHeight = 1920,
    quality = 0.8,
    useWebWorker = true,
  } = options;

  const originalSize = file.size;

  try {
    const compressedFile = await imageCompression(file, {
      maxSizeMB,
      maxWidthOrHeight,
      useWebWorker,
      initialQuality: quality,
    });

    const compressedSize = compressedFile.size;
    const compressionRatio = (originalSize - compressedSize) / originalSize;

    return {
      file: compressedFile,
      originalSize,
      compressedSize,
      compressionRatio,
    };
  } catch {
    // Return original file if compression fails
    return {
      file,
      originalSize,
      compressedSize: originalSize,
      compressionRatio: 0,
    };
  }
}

/**
 * Generate a thumbnail of a specific size
 * 
 * @param file - The image file
 * @param size - Target size (width or height, whichever is larger)
 * @returns Thumbnail file
 */
export async function generateThumbnail(
  file: File,
  size: number
): Promise<File> {
  try {
    const thumbnail = await imageCompression(file, {
      maxWidthOrHeight: size,
      useWebWorker: true,
      initialQuality: 0.85,
    });

    // Rename file to include size
    const extension = file.name.split(".").pop();
    const baseName = file.name.replace(`.${extension}`, "");
    const thumbnailFile = new File(
      [thumbnail],
      `${baseName}-${size}w.${extension}`,
      { type: thumbnail.type }
    );

    return thumbnailFile;
  } catch (error) {
    throw error;
  }
}

/**
 * Generate multiple thumbnail sizes
 * 
 * @param file - The image file
 * @param sizes - Array of sizes to generate (defaults to all standard sizes)
 * @returns Array of thumbnail results
 */
export async function generateThumbnails(
  file: File,
  sizes: number[] = Object.values(THUMBNAIL_SIZES)
): Promise<ThumbnailResult[]> {
  const results: ThumbnailResult[] = [];

  for (const size of sizes) {
    try {
      const thumbnailFile = await generateThumbnail(file, size);
      results.push({
        size,
        file: thumbnailFile,
      });
    } catch {
      // Continue with other sizes even if one fails
    }
  }

  return results;
}

/**
 * Convert image to WebP format with fallback
 * 
 * Note: Browser-image-compression doesn't directly support WebP conversion.
 * This function uses canvas to convert the image.
 * 
 * @param file - The image file
 * @returns Object with WebP file and fallback file
 */
export async function convertToWebP(
  file: File
): Promise<{ webp: File | null; fallback: File }> {
  try {
    // Create an image element
    const img = await createImageElement(file);
    
    // Create canvas
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get canvas context");
    }
    
    // Draw image on canvas
    ctx.drawImage(img, 0, 0);
    
    // Convert to WebP
    const webpBlob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/webp", 0.85);
    });
    
    if (!webpBlob) {
      throw new Error("WebP conversion failed");
    }
    
    const extension = file.name.split(".").pop();
    const baseName = file.name.replace(`.${extension}`, "");
    const webpFile = new File([webpBlob], `${baseName}.webp`, {
      type: "image/webp",
    });
    
    return {
      webp: webpFile,
      fallback: file,
    };
  } catch {
    return {
      webp: null,
      fallback: file,
    };
  }
}

/**
 * Helper function to create an image element from a file
 */
function createImageElement(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Get aspect ratio of an image file
 * 
 * @param file - The image file
 * @returns Aspect ratio (width / height)
 */
export async function getImageAspectRatio(file: File): Promise<number> {
  const img = await createImageElement(file);
  return img.width / img.height;
}

/**
 * Validate image file
 * 
 * @param file - The file to validate
 * @param options - Validation options
 * @returns Validation result
 */
export function validateImageFile(
  file: File,
  options: {
    maxSizeMB?: number;
    allowedTypes?: string[];
  } = {}
): { valid: boolean; error?: string } {
  const { maxSizeMB = 10, allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"] } = options;

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(", ")}`,
    };
  }

  // Check file size
  const fileSizeMB = file.size / 1024 / 1024;
  if (fileSizeMB > maxSizeMB) {
    return {
      valid: false,
      error: `File size (${fileSizeMB.toFixed(2)}MB) exceeds maximum allowed size (${maxSizeMB}MB)`,
    };
  }

  return { valid: true };
}

/**
 * Upload image with compression and thumbnail generation
 * 
 * @param file - The image file to upload
 * @param path - Storage path (without extension)
 * @param options - Upload options
 * @returns Object with URLs for original and thumbnails
 */
export async function uploadOptimizedImage(
  file: File,
  path: string,
  options: {
    generateThumbnails?: boolean;
    thumbnailSizes?: number[];
    compress?: boolean;
  } = {}
): Promise<{
  originalUrl: string;
  thumbnailUrls: Record<number, string>;
  compressionRatio?: number;
}> {
  const {
    generateThumbnails: shouldGenerateThumbnails = true,
    thumbnailSizes = Object.values(THUMBNAIL_SIZES),
    compress = true,
  } = options;

  // Validate file
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  let fileToUpload = file;
  let compressionRatio: number | undefined;

  // Compress if enabled
  if (compress) {
    const compressionResult = await compressImage(file);
    fileToUpload = compressionResult.file;
    compressionRatio = compressionResult.compressionRatio;
  }

  // Upload original/compressed image
  const extension = file.name.split(".").pop();
  const originalPath = `${path}.${extension}`;
  await uploadToStorage(fileToUpload, originalPath);
  const originalUrl = getStorageUrl(originalPath);

  // Generate and upload thumbnails
  const thumbnailUrls: Record<number, string> = {};
  
  if (shouldGenerateThumbnails) {
    const thumbnails = await generateThumbnails(fileToUpload, thumbnailSizes);
    
    for (const thumbnail of thumbnails) {
      const thumbnailPath = `${path}-${thumbnail.size}w.${extension}`;
      await uploadToStorage(thumbnail.file, thumbnailPath);
      thumbnailUrls[thumbnail.size] = getStorageUrl(thumbnailPath);
    }
  }

  return {
    originalUrl,
    thumbnailUrls,
    compressionRatio,
  };
}

/**
 * Get public URL for an image
 */
export function getPublicUrl(path: string): string {
  return getStorageUrl(path);
}

/**
 * Delete image and its thumbnails
 * 
 * @param path - Base path of the image (without size suffix)
 */
export async function deleteImage(path: string): Promise<void> {
  try {
    // Delete original
    await deleteFromStorage(path);

    // Delete thumbnails
    const extension = path.split(".").pop();
    const basePath = path.replace(`.${extension}`, "");
    
    for (const size of Object.values(THUMBNAIL_SIZES)) {
      try {
        await deleteFromStorage(`${basePath}-${size}w.${extension}`);
    } catch {
      // Ignore errors for thumbnails that don't exist
    }
    }
    } catch (error) {
      throw error;
    }
}

/**
 * Format file size for display
 * 
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "2.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

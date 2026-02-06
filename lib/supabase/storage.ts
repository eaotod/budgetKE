import { createClient } from "./client";

const BUCKET_NAME = "budgetke";

/**
 * Upload a file to Supabase Storage
 * @param file The file object from the input
 * @param path The path within the bucket (e.g., 'products/images/my-image.png')
 */
export async function uploadFile(file: File, path: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file, {
      upsert: true,
      cacheControl: "3600",
    });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Get a public URL for an asset
 * @param path The path within the bucket
 */
export function getPublicUrl(path: string) {
  const supabase = createClient();
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Create a signed URL for secure file downloads
 * @param path The path within the bucket
 * @param expiresIn Time in seconds (default 5 minutes)
 */
export async function createDownloadUrl(path: string, expiresIn: number = 300) {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(path, expiresIn);

  if (error) {
    throw error;
  }

  return data.signedUrl;
}

/**
 * Delete a file from Storage
 * @param path The path within the bucket
 */
export async function deleteFile(path: string) {
  const supabase = createClient();
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);
  
  if (error) {
    throw error;
  }
}

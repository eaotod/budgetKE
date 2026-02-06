"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  File01Icon,
  FloppyDiskIcon,
  Image01Icon,
  Loading03Icon,
  Upload01Icon,
} from "@hugeicons/core-free-icons";
import dynamic from "next/dynamic";
import { uploadFile, getPublicUrl, deleteFile } from "@/lib/supabase/storage";
import { createClient } from "@/lib/supabase/client";
import slugify from "slugify";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ProductFormProps {
  initialData?: any;
  isEditing?: boolean;
}

const MarkdownEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

export function ProductForm({
  initialData,
  isEditing = false,
}: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  // Form state
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [categoryId, setCategoryId] = useState(initialData?.category_id || "");
  const [shortDescription, setShortDescription] = useState(
    initialData?.short_description || "",
  );
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [status, setStatus] = useState(initialData?.status || "active");
  const [isFeatured, setIsFeatured] = useState(
    initialData?.is_featured || false,
  );
  const [isBestseller, setIsBestseller] = useState(
    initialData?.is_bestseller || false,
  );

  // File state
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(() => {
    if (!initialData?.images) return [];
    try {
      // Handle both JSON stringified array and raw URL string (legacy data)
      const parsed =
        typeof initialData.images === "string" &&
        initialData.images.trim().startsWith("[")
          ? JSON.parse(initialData.images)
          : initialData.images;

      return Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
      // Fallback for malformed JSON or plain strings
      console.warn("Failed to parse images JSON, assuming raw string URL", e);
      return typeof initialData.images === "string" ? [initialData.images] : [];
    }
  });
  const [thumbnailUrl, setThumbnailUrl] = useState(
    initialData?.thumbnail_url || "",
  );
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [existingFileUrl, setExistingFileUrl] = useState(
    initialData?.file_url || "",
  );
  const [existingFileName, setExistingFileName] = useState(
    initialData?.file_name || "",
  );

  useEffect(() => {
    async function fetchCategories() {
      const supabase = createClient();
      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      if (data) setCategories(data);
    }
    fetchCategories();
  }, []);

  // Sync slug with name only when creating
  useEffect(() => {
    if (!isEditing && name) {
      setSlug(slugify(name, { lower: true, strict: true }));
    }
  }, [name, isEditing]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewImageFiles((prev) => [...prev, ...files]);
    }
  };

  const removeNewImage = (index: number) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = async (url: string) => {
    try {
      // Extract path from URL
      // Public URL format: https://.../storage/v1/object/public/budgetke/products/images/filename.png
      const path = url.split("/public/budgetke/")[1];
      if (path) {
        await deleteFile(path);
        setExistingImages((prev) => prev.filter((img) => img !== url));
        if (thumbnailUrl === url) {
          setThumbnailUrl(existingImages.find((img) => img !== url) || "");
        }
        toast.success("Image deleted from cloud");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image from cloud");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !categoryId || (!isEditing && !templateFile)) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    try {
      // 1. Upload Template File if new one selected
      let finalFileUrl = existingFileUrl;
      let finalFileName = existingFileName;
      let finalFileSize = initialData?.file_size;
      let finalFileFormat = initialData?.file_format;

      if (templateFile) {
        const templatePath = `products/files/${slug}-${Date.now()}.${templateFile.name.split(".").pop()}`;
        await uploadFile(templateFile, templatePath);
        finalFileUrl = templatePath;
        finalFileName = templateFile.name;
        finalFileSize = (templateFile.size / 1024 / 1024).toFixed(2) + " MB";
        finalFileFormat = templateFile.name.split(".").pop()?.toUpperCase();
      }

      // 2. Upload New Images
      const uploadedImageUrls: string[] = [];
      for (const file of newImageFiles) {
        const imagePath = `products/images/${slug}-${Date.now()}-${Math.random().toString(36).substring(7)}.${file.name.split(".").pop()}`;
        await uploadFile(file, imagePath);
        uploadedImageUrls.push(getPublicUrl(imagePath));
      }

      const allImages = [...existingImages, ...uploadedImageUrls];
      const finalThumbnailUrl = thumbnailUrl || allImages[0] || "";

      // 3. Save to DB
      const productData = {
        name,
        slug,
        price: parseInt(price),
        category_id: categoryId,
        short_description: shortDescription,
        description,
        thumbnail_url: finalThumbnailUrl,
        images: allImages,
        file_url: finalFileUrl,
        file_name: finalFileName,
        file_size: finalFileSize,
        file_format: finalFileFormat,
        status,
        is_featured: isFeatured,
        is_bestseller: isBestseller,
      };

      if (isEditing) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", initialData.id);
        if (error) throw error;
        toast.success("Product updated successfully!");
      } else {
        const { error } = await supabase
          .from("products")
          .insert({ ...productData, id: slug });
        if (error) throw error;
        toast.success("Product created successfully!");
      }

      router.push("/manage/products");
      router.refresh();
    } catch (error: any) {
      console.error("Error saving product:", error);
      toast.error(error.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 space-y-8">
          <div className="space-y-3">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
              Product Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Budget Master Pro"
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-bold text-gray-900"
              required
            />
          </div>

          {!isEditing && (
            <div className="space-y-3">
              <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
                Slug
              </label>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm font-medium bg-gray-50 px-4 py-4 rounded-2xl border border-gray-100">
                  budget.ke/templates/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1 px-6 py-4 bg-gray-100 border border-gray-100 rounded-2xl text-sm font-bold text-gray-500 focus:outline-none"
                  readOnly
                />
              </div>
            </div>
          )}

          <div className="space-y-3">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
              Short Description
            </label>
            <textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              rows={2}
              placeholder="Brief summary for catalog cards..."
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium text-gray-700"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
              Long Description
            </label>
            <div
              className="rounded-2xl border border-gray-100 bg-white p-2"
              data-color-mode="light"
            >
              <MarkdownEditor
                value={description}
                onChange={(value) => setDescription(value || "")}
                preview="edit"
                height={280}
                textareaProps={{
                  placeholder:
                    "Detailed features, how it works, what's included...",
                }}
              />
            </div>
          </div>
        </div>

        {/* Media & Images */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 space-y-8">
          <div className="flex items-center justify-between">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
              Product Gallery
            </label>
            <span className="text-[10px] font-black text-primary bg-primary/5 px-3 py-1 rounded-full uppercase">
              {existingImages.length + newImageFiles.length} Images
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {/* Existing Images */}
            {existingImages.map((url, idx) => (
              <div
                key={`existing-${idx}`}
                className="relative group aspect-square rounded-3xl overflow-hidden border border-gray-100 bg-gray-50"
              >
                <img
                  src={url}
                  alt="Product"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setThumbnailUrl(url)}
                    className={cn(
                      "p-2 rounded-xl transition-all",
                      thumbnailUrl === url
                        ? "bg-primary text-white"
                        : "bg-white text-gray-900 hover:bg-primary hover:text-white",
                    )}
                    title="Set as Thumbnail"
                  >
                    <HugeiconsIcon icon={Image01Icon} className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeExistingImage(url)}
                    className="p-2 bg-white text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                  >
                    <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
                  </button>
                </div>
                {thumbnailUrl === url && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-white text-[8px] font-black uppercase tracking-widest rounded-lg shadow-lg shadow-primary/20">
                    Main
                  </div>
                )}
              </div>
            ))}

            {/* New Images */}
            {newImageFiles.map((file, idx) => (
              <div
                key={`new-${idx}`}
                className="relative group aspect-square rounded-3xl overflow-hidden border border-gray-100 bg-gray-50"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white/80 px-2 py-1 rounded-lg backdrop-blur-sm">
                    New
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeNewImage(idx)}
                  className="absolute top-3 right-3 p-2 bg-white text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                >
                  <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
                </button>
              </div>
            ))}

            {/* Upload Button */}
            <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-3xl hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
              <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-primary/10 transition-colors">
                <HugeiconsIcon
                  icon={Add01Icon}
                  className="w-6 h-6 text-gray-400 group-hover:text-primary"
                />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-4">
                Add Media
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Sidebar Controls */}
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 space-y-8">
          <div className="space-y-3">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
              Pricing (KES) *
            </label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                KES
              </span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="699"
                className="w-full pl-16 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-primary font-black text-xl text-gray-900"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
              Category *
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-primary transition-all font-bold text-gray-900 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlPSIjOTk5IiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik02IDlsNiA2IDYtNiIvPjwvc3ZnPg==')] bg-[length:20px] bg-[right_1.5rem_center] bg-no-repeat"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 space-y-8">
          <div className="space-y-3">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
              Visibility & Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none"
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="space-y-4 pt-2">
            <label className="flex items-center gap-4 cursor-pointer group p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-gray-50">
              <input
                type="checkbox"
                className="w-6 h-6 rounded-lg border-gray-300 text-primary focus:ring-primary transition-all cursor-pointer"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
              />
              <div className="flex flex-col">
                <span className="text-sm font-black text-gray-900 uppercase tracking-tight">
                  Featured Product
                </span>
                <span className="text-[10px] font-medium text-gray-400">
                  Highlight on homepage
                </span>
              </div>
            </label>

            <label className="flex items-center gap-4 cursor-pointer group p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-gray-50">
              <input
                type="checkbox"
                className="w-6 h-6 rounded-lg border-gray-300 text-primary focus:ring-primary transition-all cursor-pointer"
                checked={isBestseller}
                onChange={(e) => setIsBestseller(e.target.checked)}
              />
              <div className="flex flex-col">
                <span className="text-sm font-black text-gray-900 uppercase tracking-tight">
                  Bestseller Badge
                </span>
                <span className="text-[10px] font-medium text-gray-400">
                  Add bestseller tag
                </span>
              </div>
            </label>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 space-y-6">
          <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
            Digital Assets
          </label>
          {templateFile ? (
            <div className="flex items-center gap-4 p-5 bg-primary/5 rounded-[1.5rem] border border-primary/10">
              <div className="p-3 bg-primary/10 rounded-xl text-primary font-bold">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-black text-gray-900 truncate uppercase tracking-tight">
                  {templateFile.name}
                </div>
                <div className="text-[10px] font-bold text-primary uppercase mt-1">
                  {(templateFile.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTemplateFile(null)}
                className="p-2 hover:bg-red-50 rounded-xl text-red-400 hover:text-red-500 transition-all"
              >
                <HugeiconsIcon icon={Cancel01Icon} className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <label className="flex items-center gap-5 p-6 border-2 border-dashed border-gray-100 rounded-[2rem] hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
              <div className="p-4 bg-gray-50 rounded-2xl text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                <HugeiconsIcon icon={Upload01Icon} className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-gray-900 uppercase tracking-tight">
                  {isEditing && existingFileUrl
                    ? "Replace File"
                    : "Upload Assets"}
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  Excel or ZIP
                </span>
              </div>
              <input
                type="file"
                onChange={(e) => setTemplateFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
          )}
          {isEditing && existingFileUrl && !templateFile && (
            <div className="px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3">
              <HugeiconsIcon icon={File01Icon} className="w-4 h-4 text-gray-400" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest truncate">
                {existingFileName}
              </span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 hover:bg-black text-white py-6 rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-4 transition-all shadow-2xl shadow-gray-200 disabled:opacity-50 group hover:-translate-y-1 active:translate-y-0"
        >
          {loading ? (
            <HugeiconsIcon
              icon={Loading03Icon}
              className="w-6 h-6 animate-spin"
            />
          ) : (
            <HugeiconsIcon
              icon={FloppyDiskIcon}
              className="w-6 h-6 group-hover:scale-110 transition-transform"
            />
          )}
          {loading
            ? "Saving..."
            : isEditing
              ? "Update Product"
              : "Create Product"}
        </button>
      </div>
    </form>
  );
}

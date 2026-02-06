"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import slugify from "slugify";
import { toast } from "sonner";

interface CategoryFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export function CategoryForm({
  initialData,
  isEditing = false,
}: CategoryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form state
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [displayOrder, setDisplayOrder] = useState(
    initialData?.display_order?.toString() || "0",
  );
  const [icon, setIcon] = useState(initialData?.icon || "FolderFavouriteIcon");

  // Sync slug with name only when creating
  useEffect(() => {
    if (!isEditing && name) {
      setSlug(slugify(name, { lower: true, strict: true }));
    }
  }, [name, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    try {
      const categoryData = {
        name,
        slug,
        description,
        display_order: parseInt(displayOrder),
        icon,
      };

      if (isEditing) {
        const { error } = await supabase
          .from("categories")
          .update(categoryData)
          .eq("id", initialData.id);
        if (error) throw error;
        toast.success("Category updated successfully!");
      } else {
        const { error } = await supabase
          .from("categories")
          .insert({ ...categoryData, id: slug });
        if (error) throw error;
        toast.success("Category created successfully!");
      }

      router.push("/manage/categories");
      router.refresh();
    } catch (error: any) {
      console.error("Error saving category:", error);
      toast.error(error.message || "Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 space-y-8"
      >
        <div className="space-y-3">
          <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
            Category Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Business Tools"
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
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="What kind of templates belong here?"
            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium text-gray-700"
          />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
              Display Order
            </label>
            <input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none font-bold text-gray-900"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
              Icon Name (Hugeicons)
            </label>
            <input
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="FolderFavouriteIcon"
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none font-bold text-gray-900"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 hover:bg-black text-white py-6 rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-4 transition-all shadow-2xl shadow-gray-200 disabled:opacity-50 group hover:-translate-y-1 active:translate-y-0"
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Save className="w-6 h-6 group-hover:scale-110 transition-transform" />
          )}
          {loading
            ? "Saving..."
            : isEditing
              ? "Update Category"
              : "Create Category"}
        </button>
      </form>
    </div>
  );
}

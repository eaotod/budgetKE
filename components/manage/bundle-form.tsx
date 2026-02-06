"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, Package, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import slugify from "slugify";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface BundleFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export function BundleForm({
  initialData,
  isEditing = false,
}: BundleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  // Form state
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [bundlePrice, setBundlePrice] = useState(
    initialData?.bundle_price?.toString() || "",
  );
  const [originalPrice, setOriginalPrice] = useState(
    initialData?.original_price || 0,
  );
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [shortDescription, setShortDescription] = useState(
    initialData?.short_description || "",
  );
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(
    initialData?.product_ids || [],
  );
  const [status, setStatus] = useState(initialData?.status || "active");

  useEffect(() => {
    async function fetchProducts() {
      const supabase = createClient();
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("status", "active")
        .order("name");
      if (data) setProducts(data);
    }
    fetchProducts();
  }, []);

  // Sync slug with name only when creating
  useEffect(() => {
    if (!isEditing && name) {
      setSlug(slugify(name, { lower: true, strict: true }));
    }
  }, [name, isEditing]);

  // Sync original price based on selected products
  useEffect(() => {
    const total = products
      .filter((p) => selectedProductIds.includes(p.id))
      .reduce((sum, p) => sum + p.price, 0);
    setOriginalPrice(total);
  }, [selectedProductIds, products]);

  const toggleProduct = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !bundlePrice || selectedProductIds.length === 0) {
      toast.error(
        "Please provide a name, price, and select at least one product.",
      );
      return;
    }

    setLoading(true);
    const supabase = createClient();

    try {
      const bundleData = {
        name,
        slug,
        description,
        short_description: shortDescription,
        product_ids: selectedProductIds,
        original_price: originalPrice,
        bundle_price: parseInt(bundlePrice),
        status,
      };

      if (isEditing) {
        const { error } = await supabase
          .from("bundles")
          .update(bundleData)
          .eq("id", initialData.id);
        if (error) throw error;
        toast.success("Bundle updated successfully!");
      } else {
        const { error } = await supabase
          .from("bundles")
          .insert({ ...bundleData, id: slug });
        if (error) throw error;
        toast.success("Bundle created successfully!");
      }

      router.push("/manage/bundles");
      router.refresh();
    } catch (error: any) {
      console.error("Error saving bundle:", error);
      toast.error(error.message || "Failed to save bundle");
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
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 space-y-8">
          <div className="space-y-3">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
              Bundle Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Complete Personal Finance Toolkit"
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
                  budget.ke/bundles/
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
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Catchy one-liner..."
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium text-gray-700"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
              Full Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="What value does this bundle provide? List the included tools..."
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all font-medium text-gray-700"
            />
          </div>
        </div>

        {/* Product Selection */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 space-y-8">
          <div className="flex items-center justify-between">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
              Included Products *
            </label>
            <span className="text-[10px] font-black text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-widest">
              {selectedProductIds.length} Selected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
            {products.map((product) => {
              const isSelected = selectedProductIds.includes(product.id);
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => toggleProduct(product.id)}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group",
                    isSelected
                      ? "bg-gray-900 border-gray-900 text-white shadow-xl shadow-gray-200"
                      : "bg-gray-50 border-gray-100 hover:border-gray-200 text-gray-600 hover:bg-white",
                  )}
                >
                  <div
                    className={cn(
                      "p-2 rounded-xl transition-all",
                      isSelected
                        ? "bg-white/10 text-primary"
                        : "bg-white text-gray-300 group-hover:text-gray-400 shadow-sm",
                    )}
                  >
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Package className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={cn(
                        "text-xs font-black truncate uppercase tracking-tight",
                        isSelected ? "text-white" : "text-gray-900",
                      )}
                    >
                      {product.name}
                    </div>
                    <div
                      className={cn(
                        "text-[10px] font-bold mt-1",
                        isSelected ? "text-gray-400" : "text-gray-400",
                      )}
                    >
                      KES {product.price.toLocaleString()}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sidebar Controls */}
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 space-y-8">
          <div className="space-y-3">
            <div className="flex justify-between items-end px-1">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Original Value
              </label>
              <span className="text-sm font-bold text-gray-400 line-through decoration-red-400/50">
                KES {originalPrice.toLocaleString()}
              </span>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
                Bundle Price *
              </label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                  KES
                </span>
                <input
                  type="number"
                  value={bundlePrice}
                  onChange={(e) => setBundlePrice(e.target.value)}
                  placeholder="999"
                  className="w-full pl-16 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-primary font-black text-xl text-gray-900"
                  required
                />
              </div>
            </div>

            {originalPrice > 0 && bundlePrice && (
              <div className="p-4 bg-primary/5 rounded-2xl text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10 flex items-center justify-between">
                <span>Total Savings:</span>
                <span className="text-sm tracking-normal">
                  KES {(originalPrice - parseInt(bundlePrice)).toLocaleString()}{" "}
                  (
                  {Math.round(
                    ((originalPrice - parseInt(bundlePrice)) / originalPrice) *
                      100,
                  )}
                  %)
                </span>
              </div>
            )}
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-50">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlPSIjOTk5IiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik02IDlsNiA2IDYtNiIvPjwvc3ZnPg==')] bg-size-[20px] bg-position-[right_1.5rem_center] bg-no-repeat"
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
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
              ? "Update Bundle"
              : "Create Bundle"}
        </button>
      </div>
    </form>
  );
}

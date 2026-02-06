"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FloppyDiskIcon,
  Loading03Icon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";
import slugify from "slugify";
import { toast } from "sonner";

interface ServiceFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export function ServiceForm({ initialData, isEditing = false }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [tier, setTier] = useState(initialData?.tier || "basic");
  const [priceMin, setPriceMin] = useState(initialData?.price_min || "");
  const [priceMax, setPriceMax] = useState(initialData?.price_max || "");
  const [currency, setCurrency] = useState(initialData?.currency || "KES");
  const [timeline, setTimeline] = useState(initialData?.timeline || "");
  const [shortDescription, setShortDescription] = useState(
    initialData?.short_description || "",
  );
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [features, setFeatures] = useState(
    initialData?.features?.join("\n") || "",
  );
  const [deliverables, setDeliverables] = useState(
    initialData?.deliverables?.join("\n") || "",
  );
  const [status, setStatus] = useState(initialData?.status || "active");

  useEffect(() => {
    if (!isEditing && name) {
      setSlug(slugify(name, { lower: true, strict: true }));
    }
  }, [name, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) {
      toast.error("Name and slug are required");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const payload = {
      name,
      slug,
      tier,
      price_min: priceMin ? Number(priceMin) : null,
      price_max: priceMax ? Number(priceMax) : null,
      currency,
      timeline,
      short_description: shortDescription,
      description,
      features: features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
      deliverables: deliverables
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
      status,
    };

    const { error } = isEditing
      ? await supabase.from("services").update(payload).eq("id", initialData.id)
      : await supabase.from("services").insert({ ...payload, id: slug });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(isEditing ? "Service updated" : "Service created");
    router.push("/manage/services");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary">
            <HugeiconsIcon icon={Settings02Icon} className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900">
              {isEditing ? "Edit Service" : "New Service"}
            </h2>
            <p className="text-sm text-gray-500">
              Configure custom services offered to customers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
              Name *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:border-primary focus:outline-none"
              placeholder="Custom Excel Template"
              required
            />
          </div>
          {!isEditing && (
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
                Slug
              </label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-100 text-gray-500"
                readOnly
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
              Tier
            </label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:border-primary"
            >
              <option value="basic">Basic</option>
              <option value="advanced">Advanced</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          <div className="space-y-2 grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
                Price Min
              </label>
              <input
                type="number"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:border-primary"
                placeholder="15000"
              />
            </div>
            <div>
              <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
                Price Max
              </label>
              <input
                type="number"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:border-primary"
                placeholder="30000"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
              Timeline
            </label>
            <input
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:border-primary"
              placeholder="3-5 days"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:border-primary"
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
            Short Description
          </label>
          <input
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:border-primary"
            placeholder="Concise summary..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:border-primary"
            placeholder="Detailed description..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
              Features (one per line)
            </label>
            <textarea
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:border-primary"
              placeholder="Feature line"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">
              Deliverables (one per line)
            </label>
            <textarea
              value={deliverables}
              onChange={(e) => setDeliverables(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:border-primary"
              placeholder="Deliverable line"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gray-900 hover:bg-black text-white py-5 rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-2xl shadow-gray-200 disabled:opacity-60"
      >
        {loading ? (
          <HugeiconsIcon icon={Loading03Icon} className="w-5 h-5 animate-spin" />
        ) : (
          <HugeiconsIcon icon={FloppyDiskIcon} className="w-5 h-5" />
        )}
        {loading ? "Saving..." : isEditing ? "Update Service" : "Create Service"}
      </button>
    </form>
  );
}

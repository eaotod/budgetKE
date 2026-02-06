import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { createClient } from "@/lib/supabase/server";
import { BundlesTable } from "@/components/manage/bundles-table";

export default async function BundlesPage() {
  const supabase = await createClient();
  const { data: bundles, error } = await supabase
    .from("bundles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching bundles:", error);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Bundles
          </h1>
          <p className="text-gray-500">
            Create product packages with discounted pricing.
          </p>
        </div>
        <Link
          href="/manage/bundles/new"
          className="bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all shadow-xl shadow-gray-200/50"
        >
          <HugeiconsIcon icon={Add01Icon} className="w-5 h-5" />
          Create Bundle
        </Link>
      </div>

      <BundlesTable bundles={bundles ?? []} />
    </div>
  );
}

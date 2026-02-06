import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { BundleForm } from "@/components/manage/bundle-form";

interface EditBundlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBundlePage(props: EditBundlePageProps) {
  const params = await props.params;
  const { id } = params;
  const supabase = await createClient();

  const { data: bundle, error } = await supabase
    .from("bundles")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !bundle) {
    notFound();
  }

  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center gap-6">
        <Link
          href="/manage/bundles"
          className="p-4 bg-white hover:bg-gray-900 hover:text-white rounded-[1.5rem] border border-gray-100 transition-all text-gray-400 shadow-xl shadow-gray-200/50 group"
        >
          <HugeiconsIcon
            icon={ArrowLeft01Icon}
            className="w-6 h-6 group-hover:-translate-x-1 transition-transform"
          />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            Edit Bundle
            <span className="text-[10px] font-black text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-widest translate-y-[-2px]">
              {bundle.id}
            </span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Update the value pack details for{" "}
            <span className="text-gray-900 font-bold">{bundle.name}</span>.
          </p>
        </div>
      </div>

      <BundleForm initialData={bundle} isEditing={true} />
    </div>
  );
}

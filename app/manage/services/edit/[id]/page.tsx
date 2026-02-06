import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { ServiceForm } from "@/components/manage/service-form";
import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";

interface EditServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data: service, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !service) {
    notFound();
  }

  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center gap-6">
        <Link
          href="/manage/services"
          className="p-4 bg-white hover:bg-gray-900 hover:text-white rounded-[1.5rem] border border-gray-100 transition-all text-gray-400 shadow-xl shadow-gray-200/50 group"
        >
          <HugeiconsIcon
            icon={ArrowLeft01Icon}
            className="w-6 h-6 group-hover:-translate-x-1 transition-transform"
          />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            Edit Service
            <span className="text-[10px] font-black text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-widest translate-y-[-2px]">
              {service.id}
            </span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Update details for {service.name}.
          </p>
        </div>
      </div>

      <ServiceForm initialData={service} isEditing />
    </div>
  );
}

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { ServiceForm } from "@/components/manage/service-form";

export default function NewServicePage() {
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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Create Service
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Add a new custom service offering.
          </p>
        </div>
      </div>

      <ServiceForm />
    </div>
  );
}

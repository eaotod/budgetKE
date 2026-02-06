import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Edit02Icon,
  LinkSquare01Icon,
  MoreVerticalIcon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DeleteAction } from "@/components/manage/delete-action";
import { cn } from "@/lib/utils";

export default async function ServicesPage() {
  const supabase = createAdminClient();
  const { data: services = [] } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Services
          </h1>
          <p className="text-gray-500">Manage custom services offered to customers.</p>
        </div>
        <Link
          href="/manage/services/new"
          className="bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all shadow-xl shadow-gray-200/50"
        >
          <HugeiconsIcon icon={Add01Icon} className="w-5 h-5" />
          Add Service
        </Link>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                <th className="px-6 py-5">Service</th>
                <th className="px-6 py-5">Tier</th>
                <th className="px-6 py-5">Price Range</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-gray-100 flex items-center justify-center text-primary">
                        <HugeiconsIcon icon={Settings02Icon} className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 leading-tight">{service.name}</div>
                        <div className="text-[10px] font-medium text-gray-400 mt-0.5 uppercase tracking-wider">
                          {service.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-700 uppercase">
                    {service.tier}
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-gray-700">
                    {service.price_min
                      ? `KES ${service.price_min.toLocaleString()}`
                      : "—"}{" "}
                    -{" "}
                    {service.price_max
                      ? `KES ${service.price_max.toLocaleString()}`
                      : "—"}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                        service.status === "active"
                          ? "bg-primary/10 text-primary"
                          : "bg-gray-100 text-gray-500",
                      )}
                    >
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-1 px-1">
                      <Link
                        href={`/services#${service.slug}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                        title="View Public"
                      >
                        <HugeiconsIcon icon={LinkSquare01Icon} className="w-4 h-4" />
                      </Link>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100">
                            <HugeiconsIcon icon={MoreVerticalIcon} className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-xl">
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/manage/services/edit/${service.id}`}
                              className="flex items-center gap-2 cursor-pointer font-medium p-2"
                            >
                              <HugeiconsIcon icon={Edit02Icon} className="w-4 h-4 text-gray-500" />
                              Edit Service
                            </Link>
                          </DropdownMenuItem>
                          <DeleteAction id={service.id} type="services" name={service.name} />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

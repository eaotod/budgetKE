import {
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ExternalLink,
} from "lucide-react";
import {
  Wallet01Icon,
  ShoppingBag01Icon,
  UserGroupIcon,
  TrendingUp,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Total Revenue",
    value: "KES 42,500",
    icon: Wallet01Icon,
    trend: "+12.5%",
    positive: true,
  },
  {
    label: "Total Orders",
    value: "128",
    icon: ShoppingBag01Icon,
    trend: "+8.2%",
    positive: true,
  },
  {
    label: "Active Customers",
    value: "1,204",
    icon: UserGroupIcon,
    trend: "+5.1%",
    positive: true,
  },
];

export default function ManagePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Welcome back! Here's an overview of your business performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/30 group hover:border-primary/20 transition-all duration-500 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/5 transition-all duration-500 overflow-hidden relative">
                <HugeiconsIcon
                  icon={stat.icon}
                  className="w-7 h-7 relative z-10"
                />
                <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </div>
              <div
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-500",
                  stat.positive
                    ? "text-green-600 bg-green-50 group-hover:bg-green-100"
                    : "text-red-600 bg-red-50",
                )}
              >
                <HugeiconsIcon icon={TrendingUp} className="w-3.5 h-3.5" />
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">
                {stat.label}
              </p>
              <h3 className="text-3xl font-black text-gray-900 tracking-tight">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden">
        <div className="p-10 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">
              Recent Orders
            </h2>
            <p className="text-sm text-gray-400 mt-1 font-medium">
              Monitor your latest transactions and order status.
            </p>
          </div>
          <button className="px-6 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-full text-xs font-black uppercase tracking-widest transition-all">
            View all activity
          </button>
        </div>
        <div className="p-10">
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
              <Clock className="w-8 h-8 text-gray-200 animate-pulse" />
            </div>
            <p className="text-gray-400 font-bold tracking-tight">
              No recent orders yet
            </p>
            <p className="text-xs text-gray-300 mt-2">
              When customers start buying, they'll appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

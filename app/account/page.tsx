import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Logout01Icon,
  Download01Icon,
  ShoppingBag01Icon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons";

// Mock data for initial UI
const mockOrders = [
  {
    id: "ORD-1234-5678",
    date: "Feb 14, 2026",
    items: ["Ultimate Budget Planner 2026"],
    total: 799,
    status: "Completed",
    downloadLink: "#",
  },
];

export default async function AccountPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 bg-gray-50/30">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2">
                My Account
              </h1>
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                <HugeiconsIcon icon={UserCircleIcon} size={20} />
                {user.email}
              </div>
            </div>
            <form action="/auth/signout" method="post">
              <Button
                variant="outline"
                className="rounded-xl border-gray-200 hover:bg-gray-100 text-gray-700 font-bold"
              >
                <HugeiconsIcon icon={Logout01Icon} size={18} className="mr-2" />
                Sign Out
              </Button>
            </form>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content: Orders */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <HugeiconsIcon icon={ShoppingBag01Icon} size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Order History
                  </h2>
                </div>

                <div className="p-8">
                  {/* Empty State Logic (using mock for now so typically valid) */}
                  {mockOrders.length > 0 ? (
                    <div className="space-y-6">
                      {mockOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100"
                        >
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-bold text-gray-900">
                                {order.id}
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider">
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mb-1">
                              {order.date} • KES {order.total}
                            </p>
                            <p className="text-sm font-medium text-gray-700">
                              {order.items.join(", ")}
                            </p>
                          </div>
                          <Button size="sm" className="rounded-xl font-bold">
                            <HugeiconsIcon
                              icon={Download01Icon}
                              size={16}
                              className="mr-2"
                            />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-400 font-medium">
                        No orders found.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar: Profile / Support */}
            <div className="space-y-8">
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
                <h3 className="font-bold text-gray-900 mb-4">Need Help?</h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  Having trouble with a download or need support with a
                  template? We're here to help.
                </p>
                <Button
                  variant="outline"
                  className="w-full rounded-xl font-bold"
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

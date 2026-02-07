import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardCircleIcon,
  Logout01Icon,
  ShoppingBag01Icon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons";
import { createAdminClient } from "@/lib/supabase/admin";
import { OrderCard } from "@/components/account/order-card";

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

  const isAdmin = user.user_metadata?.role === "admin";

  const adminSupabase = createAdminClient();
  const { data: orders = [] } = await adminSupabase
    .from("orders")
    .select("*")
    .eq("email", user.email)
    .order("created_at", { ascending: false });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formattedOrders = (orders || []).map((order: any) => ({
    uuid: order.id,
    id: order.orderNumber || order.order_number || order.id,
    date: order.createdAt || order.created_at,
    email: order.email,
    total: order.total,
    status: order.paymentStatus || order.payment_status,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    downloadToken: (order as any).download_token || order.downloadToken,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: (order.items || []).map((item: any) => ({
      name: item.name,
      productId: item.productId,
      bundleId: item.bundleId,
      type: item.type,
    })),
  }));

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
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Link href="/manage">
                  <Button className="rounded-xl font-bold">
                    <HugeiconsIcon
                      icon={DashboardCircleIcon}
                      size={18}
                      className="mr-2"
                    />
                    Dashboard
                  </Button>
                </Link>
              )}
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
                  {formattedOrders.length > 0 ? (
                    <div className="space-y-6">
                      {formattedOrders.map((order) => (
                        <OrderCard key={order.uuid} order={order} />
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
                  template? We&apos;re here to help.
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

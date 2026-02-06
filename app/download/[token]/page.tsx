import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Alert01Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Download01Icon,
  Xls01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { createClient } from "@/lib/supabase/server";

interface DownloadPageProps {
  params: Promise<{ token: string }>;
}

export const metadata: Metadata = {
  title: "Download Your Purchase | BudgetKE",
  description: "Download your purchased templates from BudgetKE.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DownloadPage({ params }: DownloadPageProps) {
  const resolvedParams = await params;
  const { token } = resolvedParams;

  const supabase = await createClient();

  // Fetch order by download token
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("download_token", token)
    .single();

  if (error || !order) {
    notFound();
  }

  // Check if order is paid
  if (order.payment_status !== "completed") {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-16 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center py-16">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HugeiconsIcon icon={Clock01Icon} className="w-10 h-10 text-yellow-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Payment Pending
              </h1>
              <p className="text-gray-600 mb-6">
                Your payment hasn't been confirmed yet. If you've already paid, 
                please wait a few minutes and refresh this page.
              </p>
              <Button onClick={() => window.location.reload()} className="rounded-full px-8">
                Refresh Page
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Check download limit
  const downloadCount = order.download_count || 0;
  const maxDownloads = order.max_downloads || 5;
  const downloadsRemaining = maxDownloads - downloadCount;

  if (downloadsRemaining <= 0) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-16 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center py-16">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HugeiconsIcon icon={Alert01Icon} className="w-10 h-10 text-red-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Download Limit Reached
              </h1>
              <p className="text-gray-600 mb-6">
                You've reached the maximum download limit for this order. 
                Contact support if you need additional downloads.
              </p>
              <Link href="mailto:support@budget.ke" className="text-primary hover:underline">
                Contact Support
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Parse order items
  const items = order.items as Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Success header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Your Downloads Are Ready!
              </h1>
              <p className="text-gray-600">
                Order #{order.order_number}
              </p>
            </div>

            {/* Download card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <HugeiconsIcon icon={Xls01Icon} className="w-5 h-5 text-primary" />
                Your Files
              </h2>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        📊
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">Excel & Google Sheets</p>
                      </div>
                    </div>
                    <form action={`/api/download/${token}/${item.productId}`}>
                      <Button type="submit" variant="outline" size="sm" className="rounded-full">
                        <HugeiconsIcon icon={Download01Icon} className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </form>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <HugeiconsIcon icon={Download01Icon} className="w-4 h-4" />
                  {downloadsRemaining} download{downloadsRemaining !== 1 ? "s" : ""} remaining
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Quick Start Guide</h3>
              <ol className="space-y-2 text-sm text-blue-800">
                <li className="flex gap-2">
                  <span className="font-semibold">1.</span>
                  Download your file(s) using the buttons above
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">2.</span>
                  Open in Microsoft Excel or Google Sheets
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">3.</span>
                  Follow the instructions in the "Start Here" tab
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold">4.</span>
                  Need help? Email us at support@budget.ke
                </li>
              </ol>
            </div>

            {/* Back to shop */}
            <div className="text-center mt-8">
              <Link href="/templates" className="text-primary font-medium hover:underline">
                ← Browse More Templates
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs, BreadcrumbJsonLd } from "@/components/ui/breadcrumbs";
import { BundleCard } from "@/components/ui/bundle-card";
import { getBundles } from "@/lib/catalog";
import { FilterInput } from "@/components/ui/filter-input";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

export const metadata: Metadata = {
  title: "Template Bundles Kenya | Save with Digital Packs | BudgetKE",
  description:
    "Get the best value with BudgetKE template bundles. Combine budget planners, savings trackers & business tools. Save up to 50%. Instant download.",
  openGraph: {
    title: "Template Bundles Kenya | BudgetKE",
    description:
      "Save big with BudgetKE digital bundles. Multiple premium Excel templates in one package.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/bundles`,
    siteName: "BudgetKE",
    locale: "en_KE",
    type: "website",
  },
};

interface BundlesPageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function BundlesPage({ searchParams }: BundlesPageProps) {
  const resolvedSearchParams = await searchParams;
  const searchQuery = resolvedSearchParams.search?.toLowerCase();

  let bundles = getBundles({ status: "active" });
  if (searchQuery) {
    bundles = bundles.filter(
      (b) =>
        b.name.toLowerCase().includes(searchQuery) ||
        (b.description && b.description.toLowerCase().includes(searchQuery)) ||
        (b.shortDescription &&
          b.shortDescription.toLowerCase().includes(searchQuery)),
    );
  }
  const filteredBundles = bundles;

  const breadcrumbItems = [
    { label: "Bundles", href: "/bundles" },
    ...(searchQuery ? [{ label: `Search: ${searchQuery}` }] : []),
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <Navbar />

      <main className="md:pt-32 pt-28 pb-20 bg-gray-50/50 min-h-screen">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} className="mb-8" />

          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                {searchQuery ? (
                  <>
                    Search Results for{" "}
                    <span className="text-primary">
                      &quot;{searchQuery}&quot;
                    </span>
                  </>
                ) : (
                  "Value Bundles"
                )}
              </h1>
              <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-2xl">
                Get more for less. Our curated bundles combine essential
                templates to help you tackle specific financial goals while
                saving money.
              </p>
            </div>

            <div className="w-full lg:w-96 shrink-0">
              <React.Suspense
                fallback={
                  <div className="h-14 bg-white/50 animate-pulse rounded-2xl" />
                }
              >
                <FilterInput
                  placeholder="Search bundles..."
                  className="shadow-xl shadow-gray-200/50"
                />
              </React.Suspense>
            </div>
          </div>

          {/* Results count & Clear */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
              Showing {filteredBundles.length} bundle
              {filteredBundles.length !== 1 ? "s" : ""}
            </p>
            {searchQuery && (
              <Link
                href="/bundles"
                className="text-sm font-bold text-gray-900 hover:text-primary transition-colors flex items-center gap-2"
              >
                Clear Filters
                <HugeiconsIcon icon={Cancel01Icon} size={16} />
              </Link>
            )}
          </div>

          {/* Bundles grid */}
          {filteredBundles.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBundles.map((bundle) => (
                <BundleCard key={bundle.id} bundle={bundle} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl opacity-50">📦</span>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">
                No bundles found
              </h2>
              <p className="text-gray-500 font-medium mb-8 max-w-sm">
                We couldn&apos;t find any bundles matching your search.
              </p>
              <Link href="/bundles">
                <Button className="h-14 px-8 rounded-full bg-gray-900 hover:bg-gray-800 text-white font-bold shadow-xl shadow-gray-200">
                  View All Bundles
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BundleGridSkeleton } from "@/components/skeletons/bundle-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="md:pt-32 pt-28 pb-20 bg-gray-50/50 min-h-screen">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Breadcrumbs Skeleton */}
          <div className="flex gap-2 mb-8">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div className="max-w-3xl w-full">
              <Skeleton className="h-12 w-1/2 mb-6 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-full max-w-xl" />
                <Skeleton className="h-6 w-2/3" />
              </div>
            </div>

            <div className="w-full lg:w-96 shrink-0">
              <Skeleton className="h-14 w-full rounded-2xl" />
            </div>
          </div>

          {/* Results count Skeleton */}
          <div className="flex justify-between mb-8">
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Bundles Grid */}
          <BundleGridSkeleton />
        </div>
      </main>
      <Footer />
    </>
  );
}

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductGridSkeleton } from "@/components/skeletons/product-skeleton";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="mt-[112px]">
        {/* Hero Skeleton (Simplified) */}
        <div className="relative pt-20 pb-32 mb-10">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <Skeleton className="h-16 w-3/4 mx-auto rounded-xl" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
              <div className="flex justify-center gap-4">
                <Skeleton className="h-14 w-40 rounded-full" />
                <Skeleton className="h-14 w-40 rounded-full" />
              </div>
            </div>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-64 rounded-3xl" />
              <Skeleton className="h-64 rounded-3xl" />
              <Skeleton className="h-64 rounded-3xl" />
            </div>
          </div>
        </div>

        {/* Categories Skeleton */}
        <div className="py-20 bg-gray-50/50">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-3xl" />
              ))}
            </div>
          </div>
        </div>

        {/* Products Skeleton */}
        <div className="py-24">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="mb-12 flex justify-between items-end">
              <Skeleton className="h-10 w-64" />
            </div>
            <ProductGridSkeleton />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

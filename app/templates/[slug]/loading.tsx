import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="pt-[112px] bg-white min-h-screen">
        <div className="container mx-auto px-6 max-w-7xl pb-20">
          {/* Breadcrumbs Skeleton */}
          <div className="flex gap-2 mb-8 mt-8">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
            {/* Left Column - Gallery */}
            <div className="lg:col-span-7 space-y-8">
              <div className="aspect-square bg-gray-50 rounded-[2.5rem] overflow-hidden border border-gray-100">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="w-24 h-24 rounded-2xl shrink-0"
                  />
                ))}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="flex gap-3">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>

              <Skeleton className="h-16 w-3/4" />

              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-32" />
              </div>

              <Skeleton className="h-24 w-full" />

              <div className="pt-2">
                <Skeleton className="h-10 w-40" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Skeleton className="h-16 flex-[1.5] rounded-2xl" />
                <Skeleton className="h-16 flex-1 rounded-2xl" />
              </div>

              <div className="bg-gray-50/50 rounded-[2rem] p-8 space-y-6 border border-gray-100/50">
                <Skeleton className="h-8 w-40" />
                <div className="grid grid-cols-2 gap-6">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-24" />
                </div>
                <div className="pt-6 border-t border-gray-200/50 space-y-3">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-5 w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

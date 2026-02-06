import { Skeleton } from "@/components/ui/skeleton";

export function BundleSkeleton() {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 h-full flex flex-col relative overflow-hidden">
      <div className="aspect-[16/10] rounded-3xl bg-gray-50 mb-8 overflow-hidden relative">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="mb-6">
        <Skeleton className="h-8 w-3/4 rounded-lg mb-3" />
        <Skeleton className="h-4 w-full rounded-md mb-2" />
        <Skeleton className="h-4 w-2/3 rounded-md" />
      </div>

      <div className="mt-auto space-y-6">
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-5 h-5 rounded-full shrink-0" />
              <Skeleton className="h-4 w-full rounded-md" />
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-100 flex items-end justify-between gap-4">
          <div>
            <Skeleton className="h-3 w-16 mb-1" />
            <div className="flex items-baseline gap-2">
              <Skeleton className="h-8 w-24 rounded-lg" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>
          </div>
          <Skeleton className="h-14 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function BundleGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <BundleSkeleton key={i} />
      ))}
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 p-4 h-full flex flex-col">
      <div className="aspect-[4/3] rounded-[1.5rem] bg-gray-50 mb-6 overflow-hidden relative">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="flex items-start justify-between gap-4 mb-2">
        <Skeleton className="h-6 w-3/4 rounded-lg" />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-4 w-24 rounded-full" />
      </div>

      <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <Skeleton className="h-3 w-12 mb-1" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}

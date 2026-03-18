import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-700/50 bg-[#2a2a2a] p-4 space-y-3">
      <Skeleton className="h-48 w-full rounded-lg bg-gray-700" />
      <Skeleton className="h-4 w-3/4 bg-gray-700" />
      <Skeleton className="h-4 w-1/2 bg-gray-700" />
      <Skeleton className="h-10 w-full rounded-lg bg-gray-700" />
    </div>
  );
}

export function DonorSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <Skeleton className="h-16 w-16 rounded-full bg-gray-700" />
      <Skeleton className="h-3 w-20 bg-gray-700" />
      <Skeleton className="h-3 w-16 bg-gray-700" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-10 flex-1 bg-gray-700" />
          <Skeleton className="h-10 flex-1 bg-gray-700" />
          <Skeleton className="h-10 flex-1 bg-gray-700" />
          <Skeleton className="h-10 w-24 bg-gray-700" />
        </div>
      ))}
    </div>
  );
}

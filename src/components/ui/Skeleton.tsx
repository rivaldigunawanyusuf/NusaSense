interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-skeleton-highlight ${className}`}
      aria-hidden="true"
    />
  );
}

// Pre-composed common skeletons
export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>
    </div>
  );
}

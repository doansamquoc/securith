import { ShimmerSkeleton } from "@/components/unlumen-ui/shimmer-skeleton";

const PollCardSkeleton = () => {
  return (
    <div className="block group">
      <div className="flex items-center justify-between p-4 sm:p-5 rounded-xl border border-border/50 bg-card">
        <div className="flex items-center gap-4 min-w-0">
          {/* Left: Avatar/Icon box */}
          <ShimmerSkeleton className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl" />

          {/* Middle: Title & Details */}
          <div className="min-w-0 space-y-1">
            <ShimmerSkeleton className="h-6 w-24 md:w-48" />
            <ShimmerSkeleton className="h-4 w-32 md:w-56" />
          </div>
        </div>

        {/* Right side: Status & Value */}
        <div className="flex items-center gap-4 sm:gap-12 shrink-0">
          <div className="hidden md:block">
            <ShimmerSkeleton className="h-6 w-20 rounded-2xl" />
          </div>

          <div className="min-w-17.5 sm:min-w-25 flex flex-col gap-1 items-end">
            <ShimmerSkeleton className="h-3.75 w-12" />
            <ShimmerSkeleton className="h-7 w-8 tabular-nums" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollCardSkeleton;

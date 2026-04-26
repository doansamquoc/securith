import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ShimmerSkeleton } from "@/components/unlumen-ui/shimmer-skeleton";

export const PollResultSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <ShimmerSkeleton className="h-4 w-1/2" />
              <ShimmerSkeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <ShimmerSkeleton className="h-8 w-1/3 mb-1" />
              <ShimmerSkeleton className="h-3 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Results Skeleton */}
      <Card>
        <CardHeader className="px-4 md:px-6">
          <ShimmerSkeleton className="h-6 w-3/4 mb-2" />
          <ShimmerSkeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6 pt-4 my-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-end gap-4">
                  <ShimmerSkeleton className="h-4 w-1/3" />
                  <ShimmerSkeleton className="h-3 w-1/4" />
                </div>
                <ShimmerSkeleton className="h-2.5 w-full" />
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center ml-auto aspect-square h-72 w-full md:w-auto">
            <ShimmerSkeleton className="h-64 w-64 rounded-full" />
          </div>
        </CardContent>
      </Card>

      {/* Participants List Skeleton */}
      <Card>
        <CardHeader>
          <ShimmerSkeleton className="h-6 w-1/3 mb-2" />
          <ShimmerSkeleton className="h-4 w-2/3" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ShimmerSkeleton className="h-10 w-full" />
            {[1, 2, 3, 4, 5].map((i) => (
              <ShimmerSkeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
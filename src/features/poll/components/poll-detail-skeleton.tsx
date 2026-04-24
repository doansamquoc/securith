import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShimmerSkeleton } from "@/components/unlumen-ui/shimmer-skeleton";
import { FieldGroup } from "@/components/ui/field";

const PollDetailSkeleton = () => {
  return (
    <>
      <Alert>
        <AlertTitle>
          <ShimmerSkeleton className="h-5 w-[50%]" />
        </AlertTitle>
        <AlertDescription>
          <ShimmerSkeleton className="h-5 w-[75%]" />
        </AlertDescription>
      </Alert>

      <Card className="py-4 md:py-6">
        <CardHeader className="px-4 md:px-6">
          <CardTitle className="text-xl font-bold">
            <ShimmerSkeleton className="h-7 w-[80%]" />
          </CardTitle>
          <CardDescription className="flex items-center text-xs font-semibold gap-2">
            <ShimmerSkeleton className="h-4 w-[75%]" />
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 md:px-6 space-y-6">
          <div className="space-y-1">
            <ShimmerSkeleton className="h-5 w-full" />
            <ShimmerSkeleton className="h-5 w-[75%]" />
          </div>

          <div className="flex flex-col">
            <div className="md:col-span-8 space-y-4">
              <div className="">
                <h3 className="text-md font-medium uppercase">
                  <ShimmerSkeleton className="h-5 w-[25%]" />
                </h3>
              </div>
              <div className="space-y-6">
                <>
                  <div className="space-y-4">
                    <FieldGroup className="gap-4">
                      <ShimmerSkeleton className="h-11 w-full" />
                      <ShimmerSkeleton className="h-11 w-full" />
                      <ShimmerSkeleton className="h-11 w-full" />
                      <ShimmerSkeleton className="h-11 w-full" />
                    </FieldGroup>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2">
                    <ShimmerSkeleton className="h-9 w-full md:w-49.5" />
                    <ShimmerSkeleton className="h-9 w-full md:w-36" />
                  </div>
                </>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="py-4 md:py-6">
          <CardHeader className="px-4 md:px-6">
            <CardTitle>
              <ShimmerSkeleton className="h-6 w-[30%]" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-4 md:px-6">
            <ShimmerSkeleton className="h-9 w-full" />
            <div className="grid grid-cols-6 md:grid-cols-3 gap-2">
              <ShimmerSkeleton className="h-9 w-full" />
              <ShimmerSkeleton className="h-9 w-full" />
              <ShimmerSkeleton className="h-9 w-full" />
              <ShimmerSkeleton className="h-9 w-full" />
              <ShimmerSkeleton className="h-9 w-full" />
              <ShimmerSkeleton className="h-9 w-full" />
            </div>
          </CardContent>
        </Card>
        <Card className="py-4 md:py-6">
          <CardHeader className="px-4 md:px-6">
            <ShimmerSkeleton className="h-6 w-[30%]" />
          </CardHeader>
          <CardContent className="space-y-4 px-4 md:px-6">
            <div className="space-y-1">
              <ShimmerSkeleton className="h-5 w-[30%]" />
              <ShimmerSkeleton className="h-5 w-full" />
            </div>
            <div className="space-y-1">
              <ShimmerSkeleton className="h-5 w-[30%]" />

              <ShimmerSkeleton className="h-5 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PollDetailSkeleton;

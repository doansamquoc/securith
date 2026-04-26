import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Stat } from "../../landing/types/stat.type";
import { CountUp } from "@/components/unlumen-ui/count-up";
import { ShimmerSkeleton } from "@/components/unlumen-ui/shimmer-skeleton";

const StatCard = ({ stat, isLoading }: { stat: Stat; isLoading: boolean }) => {
  const numericValue = typeof stat.value === "string" ? parseInt(stat.value, 10) : stat.value;
  return (
    <Card size="sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-semibold uppercase">{stat.label}</CardTitle>
        {stat.icon}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ShimmerSkeleton className="h-8 w-1/2 rounded-md" />
        ) : stat.countEffect ? (
          <CountUp to={numericValue} className="text-2xl font-bold" />
        ) : (
          <div className="text-2xl font-bold">{stat.value}</div>
        )}
        <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;

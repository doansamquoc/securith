import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Stat } from "../types/stat.type";
import { CountUp } from "@/components/unlumen-ui/count-up";

const StatCard = ({ stat }: { stat: Stat }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold uppercase">{stat.label}</CardTitle>
        {stat.icon}
      </CardHeader>
      <CardContent>
        {stat.countEffect ? (
          <CountUp to={Number.parseInt(stat.value)} className="text-2xl font-bold" />
        ) : (
          <div className="text-2xl font-bold">{stat.value}</div>
        )}
        <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;

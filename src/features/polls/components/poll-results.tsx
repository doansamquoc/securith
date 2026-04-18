import type { PollAnalytics } from "../types";
import { cn } from "@/lib/utils";

interface PollResultsProps {
  analytics: PollAnalytics;
}

export function PollResults({ analytics }: PollResultsProps) {
  return (
    <div className="space-y-6">
      {analytics.voteDistribution.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{item.option}</span>
            <span className="text-muted-foreground">
              {item.percentage.toFixed(1)}% ({item.votes.toString()})
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-full transition-all duration-500 ease-in-out",
                index === 0 ? "bg-primary" : "bg-primary/40",
              )}
              style={{ width: `${item.percentage}%` }}
            />
          </div>
        </div>
      ))}
      <div className="pt-4 mt-6 border-t text-xs text-muted-foreground flex justify-between font-medium">
        <span>Total votes: {analytics.totalVotes.toString()}</span>
        <span>Unique voters: {analytics.uniqueVoters.toString()}</span>
      </div>
    </div>
  );
}

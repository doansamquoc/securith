import type { PollAnalytics } from "../types";
import { cn } from "@/lib/utils";

interface PollResultsProps {
  analytics: PollAnalytics;
}

export function PollResults({ analytics }: PollResultsProps) {
  return (
    <div className="space-y-4">
      {analytics.voteDistribution.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>{item.option}</span>
            <span>
              {item.votes.toString()} ({item.percentage.toFixed(1)}%)
            </span>
          </div>
          <div className="relative h-4 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className={cn(
                "h-full bg-primary transition-all duration-500 ease-in-out",
                // Highlight winner if needed
                index === 0 ? "bg-primary" : "bg-primary/60",
              )}
              style={{ width: `${item.percentage}%` }}
            />
          </div>
        </div>
      ))}
      <div className="pt-4 mt-4 border-t text-xs text-muted-foreground flex justify-between">
        <span>Tổng số phiếu: {analytics.totalVotes.toString()}</span>
        <span>Người bầu: {analytics.uniqueVoters.toString()}</span>
      </div>
    </div>
  );
}

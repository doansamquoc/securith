import type { PollAnalytics } from "../types";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users2, Target } from "lucide-react";
import { IconChartLine, IconUsersGroup } from "@tabler/icons-react";

interface PollResultsProps {
  analytics: PollAnalytics;
}

export function PollResults({ analytics }: PollResultsProps) {
  // Tìm phương án có số phiếu cao nhất để đánh dấu
  const maxVotes = analytics.voteDistribution.reduce((max, item) => (item.votes > max ? item.votes : max), BigInt(0));

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-border/60 bg-muted/20 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <IconChartLine className="h-3.5 w-3.5" />
            <span className="text-[10px] uppercase tracking-wider font-bold">Tổng số phiếu</span>
          </div>
          <span className="text-2xl font-bold tabular-nums">{analytics.totalVotes.toLocaleString()}</span>
        </div>
        <div className="p-4 rounded-xl border border-border/60 bg-muted/20 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <IconUsersGroup className="h-3.5 w-3.5" />
            <span className="text-[10px] uppercase tracking-wider font-bold">Người tham gia</span>
          </div>
          <span className="text-2xl font-bold tabular-nums">{analytics.uniqueVoters.toLocaleString()}</span>
        </div>
      </div>

      <div>
        <div className="pb-2">
          <div className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
            <Target className="h-4 w-4" />
            Chi tiết kết quả
          </div>
        </div>
        <div className="space-y-6 pt-4">
          {analytics.voteDistribution.map((item, index) => {
            const isWinner = item.votes > BigInt(0) && item.votes === maxVotes;

            return (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-end gap-4">
                  <div className="space-y-1">
                    <span
                      className={cn(
                        "text-sm font-semibold transition-colors",
                        isWinner ? "text-primary" : "text-foreground/80",
                      )}
                    >
                      {item.option}
                      {isWinner && (
                        <span className="ml-2 text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded uppercase tracking-tighter">
                          Dẫn đầu
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold tabular-nums">{item.percentage.toFixed(1)}%</span>
                    <span className="text-[10px] text-muted-foreground block tabular-nums">
                      {item.votes.toLocaleString()} phiếu
                    </span>
                  </div>
                </div>
                <Progress
                  value={item.percentage}
                  className={cn("h-2.5 bg-muted/50", isWinner ? "[&>div]:bg-primary" : "[&>div]:bg-primary/30")}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

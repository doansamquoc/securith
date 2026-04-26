import { PollStatusBadge } from "./poll-status-badge";
import { Link } from "react-router-dom";
import type { PollStatus, PollSummary } from "../types/types";
import { Card, CardContent } from "@/components/ui/card";
import { formatBigIntToDate } from "../utils/date-utils";

interface PollCardProps {
  poll: PollSummary;
}

export function PollCard({ poll }: PollCardProps) {
  return (
    <Link to={`/polls/${poll.id}`} className="block group">
      <Card className="py-4!">
        <CardContent className="flex items-center justify-between px-4!">
          <div className="flex items-center gap-4 min-w-0">
            {/* Left: Avatar/Icon box */}
            <img src={`https://api.dicebear.com/9.x/glass/svg?seed=${poll.id}`} alt="Image" className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl" />
            {/* Middle: Title & Details */}
            <div className="min-w-0 space-y-1">
              <h3 className="font-bold text-sm sm:text-base truncate group-hover:text-primary transition-colors">{poll.title}</h3>
              <span className="text-[10px] sm:text-xs text-muted-foreground font-bold">{formatBigIntToDate(poll.createdAt)}</span>
            </div>
          </div>

          {/* Right side: Status & Value */}
          <div className="flex items-center gap-4 sm:gap-12 shrink-0">
            <div className="hidden md:block">
              <PollStatusBadge status={Number(poll.status) as PollStatus} className="h-6 text-[9px] uppercase font-black" />
            </div>

            <div className="text-right min-w-17.5 sm:min-w-25">
              <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase font-black tracking-tighter">Lượt bầu</p>
              <p className="text-sm sm:text-xl font-black tabular-nums">{poll.participants.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

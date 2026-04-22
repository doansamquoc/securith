import { PollStatusBadge } from "./poll-status-badge";
import { Link } from "@tanstack/react-router";
import type { Poll } from "../types/types";
import { Card, CardContent } from "@/components/ui/card";

interface PollCardProps {
  poll: Poll;
}

export function PollCard({ poll }: PollCardProps) {
  // Initials for poll (example: "The best framework" -> "TBF")
  const initials = poll.title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  const startDate = new Date(Number(poll.startsAt) * 1000);

  return (
    <Link to="/polls/$pollId" params={{ pollId: poll.id }} className="block group">
      <Card className="p-4">
        <CardContent className="flex items-center justify-between px-0!">
          <div className="flex items-center gap-4 min-w-0">
            {/* Left: Avatar/Icon box */}
            <img src={`https://api.dicebear.com/9.x/glass/svg?seed=${initials}`} alt="Image" className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl" />
            {/* Middle: Title & Details */}
            <div className="min-w-0 space-y-1">
              <h3 className="font-bold text-sm sm:text-base truncate group-hover:text-primary transition-colors">{poll.title}</h3>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground uppercase font-bold tracking-tight">
                <span>Lúc {startDate.toLocaleDateString("vn", { day: "2-digit", month: "long", year: "numeric" })}</span>
              </div>
            </div>
          </div>

          {/* Right side: Status & Value */}
          <div className="flex items-center gap-4 sm:gap-12 shrink-0">
            <div className="hidden md:block">
              <PollStatusBadge status={poll.status} className="h-6 text-[9px] uppercase font-black" />
            </div>

            <div className="text-right min-w-17.5 sm:min-w-25">
              <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase font-black tracking-tighter">Lượt bầu</p>
              <p className="text-sm sm:text-xl font-black tabular-nums">{poll.totalVotes.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

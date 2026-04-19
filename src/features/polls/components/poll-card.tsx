import { PollStatusBadge } from "./poll-status-badge";
import { Link } from "@tanstack/react-router";
import type { Poll } from "../types";
import { Badge } from "@/components/ui/badge";

interface PollCardProps {
  poll: Poll;
}

export function PollCard({ poll }: PollCardProps) {
  // Tạo initials cho poll (ví dụ: "Framework nào tốt" -> "FNT")
  const initials = poll.title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  const startDate = new Date(Number(poll.startsAt) * 1000);

  return (
    <Link 
      to="/polls/$pollId" 
      params={{ pollId: poll.id }}
      className="block group"
    >
      <div className="flex items-center justify-between p-4 sm:p-5 rounded-xl border border-border/50 bg-card hover:bg-muted/50 transition-all duration-200">
        <div className="flex items-center gap-4 min-w-0">
          {/* Left: Avatar/Icon box */}
          <div className="h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center rounded-xl bg-muted font-bold text-muted-foreground text-xs sm:text-sm shrink-0 border border-border/40 group-hover:border-primary/20 transition-colors uppercase">
            {initials}
          </div>
          
          {/* Middle: Title & Details */}
          <div className="min-w-0 space-y-1">
            <h3 className="font-bold text-sm sm:text-base truncate group-hover:text-primary transition-colors">
              {poll.title}
            </h3>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground uppercase font-bold tracking-tight">
              <span>By {poll.creator.slice(0, 4)}...{poll.creator.slice(-4)}</span>
              <span>•</span>
              <span>{startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
        
        {/* Right side: Status & Value */}
        <div className="flex items-center gap-4 sm:gap-12 shrink-0">
          <div className="hidden md:block">
            <PollStatusBadge status={poll.status} className="h-6 text-[9px] uppercase font-black" />
          </div>
          
          <div className="text-right min-w-[70px] sm:min-w-[100px]">
            <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase font-black tracking-tighter">Lượt bầu</p>
            <p className="text-sm sm:text-xl font-black tabular-nums">
              {poll.totalVotes.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

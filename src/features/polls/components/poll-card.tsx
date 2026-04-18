import { PollStatusBadge } from "./poll-status-badge";
import { Link } from "@tanstack/react-router";
import type { Poll } from "../types";

interface PollCardProps {
  poll: Poll;
}

export function PollCard({ poll }: PollCardProps) {
  return (
    <Link 
      to="/polls/$pollId" 
      params={{ pollId: poll.id }}
      className="group flex flex-col h-full rounded-xl border bg-background p-6 hover:bg-muted/30 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <PollStatusBadge status={poll.status} />
        {poll.settings.multiChoice && (
          <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/60">
            Multi-choice
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold leading-snug mb-2 group-hover:text-primary transition-colors">
        {poll.title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-6">
        {poll.description}
      </p>
      <div className="mt-auto pt-4 text-xs font-medium text-muted-foreground">
        {poll.totalVotes.toString()} votes
      </div>
    </Link>
  );
}

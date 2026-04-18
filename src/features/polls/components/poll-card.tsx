import { PollStatusBadge } from "./poll-status-badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import type { Poll } from "../types";

interface PollCardProps {
  poll: Poll;
}

export function PollCard({ poll }: PollCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-none border-border/30 rounded-lg hover:border-border transition-colors">
      <CardHeader className="space-y-2 pb-2">
        <div className="flex items-center justify-between">
          <PollStatusBadge status={poll.status} />
          {poll.settings.multiChoice && (
            <span className="text-[10px] uppercase tracking-wider font-light text-muted-foreground">
              Multi-choice
            </span>
          )}
        </div>
        <CardTitle className="line-clamp-2 text-lg font-light leading-snug">{poll.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <p className="text-xs text-muted-foreground line-clamp-2 font-light leading-relaxed">{poll.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2 text-xs text-muted-foreground font-light border-t border-border/30">
        <span>{poll.totalVotes.toString()} votes</span>
        <Button variant="ghost" size="sm" asChild className="h-6 font-light px-2 text-xs">
          <Link to="/polls/$pollId" params={{ pollId: poll.id }}>
            Xem chi tiết
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

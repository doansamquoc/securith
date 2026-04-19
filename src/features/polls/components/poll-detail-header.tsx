import type { Poll } from "../types";
import { PollStatusBadge } from "./poll-status-badge";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, ShieldCheck } from "lucide-react";

interface PollDetailHeaderProps {
  poll: Poll;
}

export function PollDetailHeader({ poll }: PollDetailHeaderProps) {
  const endDate = new Date(Number(poll.endsAt) * 1000);

  return (
    <div className="space-y-8 pb-10">
      {/* <div className="flex flex-wrap items-center gap-3">
        <PollStatusBadge status={poll.status} />
        {poll.settings.multiChoice && (
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-none"
          >
            Đa lựa chọn
          </Badge>
        )}
        <Badge variant="outline" className="gap-1.5 py-1 text-muted-foreground border-border/60">
          <ShieldCheck className="h-3 w-3" />
          <span>Blockchain Verified</span>
        </Badge>
      </div> */}

      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">{poll.title}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl font-light italic">{poll.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Người tạo</p>
            <p className="text-sm font-mono font-medium">
              {poll.creator.slice(0, 6)}...{poll.creator.slice(-4)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Thời hạn kết thúc</p>
            <p className="text-sm font-medium">{format(endDate, "PPPp", { locale: vi })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

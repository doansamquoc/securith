import { CardDescription, CardTitle } from "@/components/ui/card";
import type { Poll } from "../types";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { PollStatusBadge } from "./poll-status-badge";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";

interface PollDetailHeaderProps {
  poll: Poll;
}

export function PollDetailHeader({ poll }: PollDetailHeaderProps) {
  const endDate = new Date(Number(poll.endsAt) * 1000);

  return (
    <div>
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

      <CardTitle className="text-2xl font-bold tracking-tight text-foreground">{poll.title}</CardTitle>
      <CardDescription className="text-md text-muted-foreground">{poll.description}</CardDescription>

      {/* <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
        <div>
          <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Người tạo</p>
          <p className="text-sm font-medium">
            {poll.creator.slice(0, 6)}...{poll.creator.slice(-4)}
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Thời hạn kết thúc</p>
          <p className="text-sm font-medium">{format(endDate, "PPPp", { locale: vi })}</p>
        </div>
      </div> */}
    </div>
  );
}

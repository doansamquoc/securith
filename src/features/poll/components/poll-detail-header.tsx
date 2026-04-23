import { CardDescription, CardTitle } from "@/components/ui/card";
import type { PollDetails, PollStatus } from "../types/types";
import { PollStatusBadge } from "./poll-status-badge";
import { Badge } from "@/components/ui/badge";
import { IconShieldCheck } from "@tabler/icons-react";
import { formatUnixToVNDateString } from "../utils/date-utils";

interface PollDetailHeaderProps {
  readonly poll: PollDetails;
}

export function PollDetailHeader({ poll }: PollDetailHeaderProps) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <PollStatusBadge status={Number(poll.status) as PollStatus} />
        {poll.settings.multiChoice && (
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-none">
            Đa lựa chọn
          </Badge>
        )}
        <Badge variant="outline" className="gap-1.5 py-1 text-muted-foreground border-border/60">
          <IconShieldCheck className="h-3 w-3" />
          <span>Blockchain Verified</span>
        </Badge>
      </div>

      <CardTitle className="text-2xl font-bold tracking-tight text-foreground">{poll.title}</CardTitle>
      {poll.description && <CardDescription className="text-md text-muted-foreground">{poll.description}</CardDescription>}

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
        <div>
          <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Người tạo</p>
          <p className="text-sm font-medium">
            {poll.creator.slice(0, 6)}...{poll.creator.slice(-4)}
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Thời hạn kết thúc</p>
          <p className="text-sm font-medium">{formatUnixToVNDateString(poll.endsAt)}</p>
        </div>
      </div>
    </div>
  );
}

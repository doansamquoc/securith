import type { Poll } from "../types";
import { PollStatusBadge } from "./poll-status-badge";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface PollDetailHeaderProps {
  poll: Poll;
}

export function PollDetailHeader({ poll }: PollDetailHeaderProps) {
  const endDate = new Date(Number(poll.endsAt) * 1000);

  return (
    <div className="space-y-6 pb-6 border-b">
      <div className="flex items-center gap-3">
        <PollStatusBadge status={poll.status} />
        {poll.settings.multiChoice && (
          <span className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">
            Nhiều lựa chọn
          </span>
        )}
      </div>
      
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">{poll.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">{poll.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
        <div>
          <span className="uppercase tracking-wider text-[10px] font-semibold mr-2">Người tạo</span>
          <span className="font-mono">{poll.creator.slice(0, 6)}...{poll.creator.slice(-4)}</span>
        </div>
        <div>
          <span className="uppercase tracking-wider text-[10px] font-semibold mr-2">Hết hạn</span>
          <span>{format(endDate, "PPPp", { locale: vi })}</span>
        </div>
      </div>
    </div>
  );
}

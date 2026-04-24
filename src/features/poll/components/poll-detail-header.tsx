import { CardDescription, CardTitle } from "@/components/ui/card";
import type { PollDetails } from "../types/types";
import { formatBigIntToDate } from "../utils/date-utils";
import { shortenAddress } from "@/utils/utils";

interface PollDetailHeaderProps {
  readonly poll: PollDetails;
}

export function PollDetailHeader({ poll }: PollDetailHeaderProps) {
  return (
    <div>
      <div className="flex flex-col">
        <CardTitle className="text-2xl font-bold tracking-tight text-foreground">{poll.title}</CardTitle>
        <CardDescription>Bởi {shortenAddress(poll.creator)}</CardDescription>
      </div>
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
          <p className="text-sm font-medium">{formatBigIntToDate(poll.endsAt)}</p>
        </div>
      </div>
    </div>
  );
}

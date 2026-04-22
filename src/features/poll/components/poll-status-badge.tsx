import { Badge } from "@/components/ui/badge";
import { PollStatus } from "../types/types";
import { cn } from "@/lib/utils";

interface PollStatusBadgeProps {
  status: PollStatus;
  className?: string;
}

export function PollStatusBadge({ status, className }: PollStatusBadgeProps) {
  const statusConfig = {
    [PollStatus.NotStarted]: {
      label: "Sắp diễn ra",
      variant: "secondary" as const,
      className: "bg-amber-100 text-amber-700 hover:bg-amber-100/80 dark:bg-amber-900/30 dark:text-amber-400",
    },
    [PollStatus.Active]: {
      label: "Đang diễn ra",
      variant: "default" as const,
      className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100/80 dark:bg-emerald-900/30 dark:text-emerald-400 border-none",
    },
    [PollStatus.Ended]: {
      label: "Đã kết thúc",
      variant: "secondary" as const,
      className: "bg-slate-100 text-slate-700 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-400",
    },
    [PollStatus.Cancelled]: {
      label: "Đã hủy",
      variant: "destructive" as const,
      className: "",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={cn("px-2.5 py-0.5 font-medium shadow-none", config.className, className)}>
      {config.label}
    </Badge>
  );
}

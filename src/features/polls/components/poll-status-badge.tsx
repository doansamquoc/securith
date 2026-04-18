import { PollStatus } from "../types";
import { cn } from "@/lib/utils";

interface PollStatusBadgeProps {
  status: PollStatus;
  className?: string;
}

export function PollStatusBadge({ status, className }: PollStatusBadgeProps) {
  const statusConfig = {
    [PollStatus.NotStarted]: {
      label: "Sắp diễn ra",
      className: "border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-400 bg-transparent",
    },
    [PollStatus.Active]: {
      label: "Đang diễn ra",
      className: "border-green-200 text-green-700 dark:border-green-800 dark:text-green-400 bg-transparent",
    },
    [PollStatus.Ended]: {
      label: "Đã kết thúc",
      className: "border-border text-muted-foreground bg-transparent",
    },
    [PollStatus.Cancelled]: {
      label: "Đã hủy",
      className: "border-red-200 text-red-700 dark:border-red-800 dark:text-red-400 bg-transparent",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] uppercase tracking-wider font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}

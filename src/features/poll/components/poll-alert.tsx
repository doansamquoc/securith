import AlertCustom from "@/components/alert-custom";
import { PollStatus, type PollDetails } from "../types/types";
import { formatBigIntToDate, formatCountdown, toDate } from "../utils/date-utils";

interface PollAlertProps {
  poll: PollDetails;
}

const PollAlert = ({ poll }: PollAlertProps) => {
  const titles = {
    [PollStatus.NotStarted]: "Cuộc bầu chọn sẽ sớm diễn ra",
    [PollStatus.Active]: "Cuộc bầu chọn đang diễn ra",
    [PollStatus.Ended]: "Cuộc bầu chọn đã kết thúc",
    [PollStatus.Cancelled]: "Cuộc bầu chọn đã bị hủy",
  };

  const descriptions = {
    [PollStatus.NotStarted]: `Sẽ bắt đầu sau ${formatCountdown(toDate(poll.startsAt))}`,
    [PollStatus.Active]: `Sẽ kết thúc sau ${formatCountdown(toDate(poll.endsAt))}`,
    [PollStatus.Ended]: `Đã kết thúc vào ${formatBigIntToDate(poll.endsAt)}`,
    [PollStatus.Cancelled]: `Đã bị hủy vào ${formatBigIntToDate(poll.endsAt)}`,
  };

  const variants = {
    [PollStatus.NotStarted]: "info",
    [PollStatus.Active]: "success",
    [PollStatus.Ended]: "warning",
    [PollStatus.Cancelled]: "destructive",
  } as const;

  const title = titles[poll.status as PollStatus];
  const description = descriptions[poll.status as PollStatus];
  const variant = variants[poll.status as PollStatus];

  return <AlertCustom title={title} description={description} variant={variant} />;
};

export default PollAlert;

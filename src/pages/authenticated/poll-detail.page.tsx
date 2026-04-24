import { useParams } from "react-router-dom";
import { PollResultVisibility, type PollDetails as PollDetailType } from "@/features/poll";
import { useGetPollDetails } from "@/features/poll/hooks/use-get-poll-details";

import PollDetails from "@/features/poll/components/poll-details";
import PollDetailSkeleton from "@/features/poll/components/poll-detail-skeleton";

export default function PollDetailPage() {
  const { pollId } = useParams();

  const { data, isPending, error } = useGetPollDetails(pollId ? BigInt(pollId) : BigInt(0));
  const poll = { ...data, settings: { ...data?.settings, resultVisibility: data?.settings.resultVisibility as PollResultVisibility } } as
    | PollDetailType
    | undefined;

  if (!poll) {
    return <div>Cuộc bầu chọn này không tồn tại</div>;
  }

  if (error) {
    return <div>Có lỗi xảy ra khi tải cuộc bầu chọn: {error.message}</div>;
  }

  return <div className="py-4 max-w-4xl mx-auto space-y-4 container px-4">{isPending ? <PollDetailSkeleton /> : <PollDetails poll={poll} />}</div>;
}

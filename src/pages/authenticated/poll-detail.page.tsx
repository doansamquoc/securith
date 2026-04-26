import { useParams } from "react-router-dom";
import { ResultVisibility, type PollDetails as PollDetailType } from "@/features/poll";
import { useGetPollDetails } from "@/features/poll/hooks/use-get-poll-details";

import PollDetails from "@/features/poll/components/poll-details";
import PollDetailSkeleton from "@/features/poll/components/poll-detail-skeleton";
import PollNotFound from "@/features/poll/components/poll-not-found";

export default function PollDetailPage() {
  const { pollId } = useParams();

  const { data, isPending, error } = useGetPollDetails(pollId ? BigInt(pollId) : BigInt(0));
  const poll = { ...data, settings: { ...data?.settings, resultVisibility: data?.settings.resultVisibility as ResultVisibility } } as
    | PollDetailType
    | undefined;

  if (error || !poll) {
    return <PollNotFound />;
  }

  return <div className="max-w-4xl mx-auto space-y-4 container p-4">{isPending ? <PollDetailSkeleton /> : <PollDetails poll={poll} />}</div>;
}

import { PollResults } from "@/features/poll/components/poll-results";
import { useGetPollResult } from "@/features/poll/hooks/use-get-poll-result";
import { PollResultSkeleton } from "@/features/poll/components/poll-result-skeleton";
import PollAccessDenied from "@/features/poll/components/poll-access-denied";
import { useParams } from "react-router-dom";

const PollResultPage = () => {
  const { pollId } = useParams();
  const { data, isPending, error } = useGetPollResult(BigInt(pollId!));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
      {isPending && <PollResultSkeleton />}

      {error && !isPending && <PollAccessDenied />}

      {data && !isPending && !error && <PollResults result={{ ...data, optionsResult: [...data.optionsResult] }} isPending={isPending} />}
    </div>
  );
};

export default PollResultPage;

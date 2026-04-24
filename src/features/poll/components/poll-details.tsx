import PollInfoCard from "./poll-info-card";
import ShareCard from "./share-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PollVoteForm } from "./poll-vote-form";
import PollAlert from "./poll-alert";
import CopyButton from "@/components/copy-button";
import { shortenAddress } from "@/utils/utils";
import { formatRelativeTime, toDate } from "../utils/date-utils";
import type { PollDetails as PollDetailType } from "../types/types";

interface PollDetailsProps {
  poll: PollDetailType;
}

const PollDetails = ({ poll }: PollDetailsProps) => {
  async function handleVote(selectedOptions: number[]) {
    console.log("Voting for options:", selectedOptions);
    // In reality, this would call the contract
  }
  return (
    <>
      <PollAlert poll={poll} />
      <Card className="py-4 md:py-6">
        <CardHeader className="px-4 md:px-6">
          <CardTitle className="text-xl font-bold">{poll.title}</CardTitle>
          <CardDescription className="flex items-center text-xs font-semibold gap-2">
            <span className="flex items-center">
              Bởi {shortenAddress(poll.creator)} <CopyButton textToCopy={poll.creator} size={"icon-xs"} variant={"ghost"} />
            </span>
            <span>{formatRelativeTime(toDate(poll.createdAt))}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 md:px-6 space-y-6">
          {poll.description && <CardDescription>{poll.description}</CardDescription>}
          <div className="flex flex-col">
            <div className="md:col-span-8 space-y-4">
              <div className="">
                <h3 className="text-md font-medium uppercase">{poll.settings.multiChoice ? "Chọn nhiều đáp án" : "Chọn một đáp án"}</h3>
              </div>
              <div className="space-y-6">
                <PollVoteForm poll={poll} onVote={handleVote} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ShareCard />
        <PollInfoCard />
      </div>
    </>
  );
};

export default PollDetails;

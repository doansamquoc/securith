import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PollResultVisibility, PollStatus } from "@/features/poll";
import { PollDetailHeader } from "@/features/poll/components/poll-detail-header";
import { PollVoteForm } from "@/features/poll/components/poll-vote-form";
import { Empty, EmptyContent, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { IconArrowLeft, IconCheck, IconDotsVertical, IconExternalLink, IconShare2, IconShieldCheck, IconUnlink } from "@tabler/icons-react";
import SuccessAlert from "@/components/success-alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { useGetPollDetails } from "@/features/poll/hooks/use-get-poll-details";

export default function PollDetailPage() {
  const { pollId } = useParams();

  const { data: poll, isPending, error } = useGetPollDetails(pollId ? BigInt(pollId) : BigInt(0));

  console.log("Poll details data:", poll, "isPending:", isPending, "Error:", error);

  if (isPending) {
    return <span className="text-muted-foreground py-8 text-sm">Đang tải chi tiết cuộc bầu chọn...</span>;
  }

  if (!poll) {
    return <div>Cuộc bầu chọn này không tồn tại</div>;
  }

  const handleVote = (selectedOptions: number[]) => {
    console.log("Voting for options:", selectedOptions);
    // In reality, this would call the contract
    alert(`Bạn đã bầu cho phương án: ${selectedOptions.map((i) => poll.options[i]).join(", ")}`);
  };

  return (
    <div className="py-12 max-w-4xl mx-auto space-y-12 container px-4">
      <div className="flex items-center justify-between">
        <Button variant="secondary" size="default" asChild>
          <Link to="/dashboard">
            <IconArrowLeft /> Trở về
          </Link>
        </Button>
        <ButtonGroup>
          <Button variant="secondary">
            <IconShare2 /> Chia sẻ
          </Button>
          <ButtonGroupSeparator />
          <Button size="icon" variant="secondary">
            <IconDotsVertical />
          </Button>
        </ButtonGroup>
      </div>
      <Card>
        <CardHeader>
          <PollDetailHeader poll={{ ...poll, settings: { ...poll.settings, resultVisibility: poll.settings.resultVisibility as PollResultVisibility } }} />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="md:col-span-8 space-y-4">
              <div className="">
                <h3 className="text-md font-medium uppercase">{poll.settings.multiChoice ? "Chọn nhiều đáp án" : "Chọn một đáp án"}</h3>
              </div>
              <div className="space-y-6">
                <PollVoteForm
                  poll={{ ...poll, settings: { ...poll.settings, resultVisibility: poll.settings.resultVisibility as PollResultVisibility } }}
                  onVote={handleVote}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="md:col-span-4 space-y-8">
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border/50 space-y-4 bg-muted/10">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">Mạng lưới</span>
              <span className="text-sm font-medium flex items-center gap-1.5">
                <IconShieldCheck className="h-3 w-3 text-primary" /> Base Sepolia
              </span>
            </div>
            <div className="space-y-1 pt-2 border-t border-border/50">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">Smart Contract</span>
              <span className="text-xs font-mono break-all text-muted-foreground">0x000000000000000000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

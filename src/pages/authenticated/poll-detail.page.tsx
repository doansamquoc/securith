import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MOCK_POLLS, MOCK_POLL_ANALYTICS, MOCK_VOTER_DETAILS, PollStatus } from "@/features/poll";
import { PollDetailHeader } from "@/features/poll/components/poll-detail-header";
import { PollVoteForm } from "@/features/poll/components/poll-vote-form";
import { PollResults } from "@/features/poll/components/poll-results";
import { Empty, EmptyContent, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { IconArrowLeft, IconCheck, IconDotsVertical, IconExternalLink, IconShare2, IconShieldCheck, IconUnlink } from "@tabler/icons-react";
import SuccessAlert from "@/components/success-alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";

export default function PollDetailPage() {
  const { pollId } = useParams();

  // Find poll from mock data
  const poll = MOCK_POLLS.find((p) => p.id === pollId);
  const analytics = pollId ? MOCK_POLL_ANALYTICS[pollId] : undefined;
  const voterDetails = pollId ? MOCK_VOTER_DETAILS[pollId] : undefined;

  if (!poll) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia>
            <IconUnlink size={48} />
          </EmptyMedia>
          <EmptyTitle>Cuộc bầu chọn này không tồn tại</EmptyTitle>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button size="sm" variant={"link"} asChild>
            <Link to="/dashboard">
              Quay lại Bảng Điều Khiển <IconExternalLink />
            </Link>
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  const hasVoted = voterDetails?.voted;
  const canVote = poll.status === PollStatus.Active && !hasVoted;

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
          <PollDetailHeader poll={poll} />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="md:col-span-8 space-y-4">
              <div className="">
                <h3 className="text-md font-medium uppercase">{canVote ? "Lựa chọn của bạn" : "Kết quả"}</h3>
                {canVote ?? <span className="text-muted-foreground text-xs">{poll.settings.multiChoice ? "Chọn nhiều đáp án" : "Chọn một đáp án"}</span>}
              </div>

              {canVote ? (
                <div className="space-y-6">
                  <PollVoteForm poll={poll} onVote={handleVote} />
                </div>
              ) : (
                <div className="space-y-6">
                  {hasVoted && (
                    <SuccessAlert
                      icon={<IconCheck />}
                      title="Đã Bầu Chọn"
                      description="Bạn đã tham gia cuộc bầu chọn này. Phiếu bầu đã được ghi nhận trên chuỗi."
                    />
                  )}
                  {analytics ? <PollResults analytics={analytics} /> : <p className="text-muted-foreground py-8 text-sm">Chưa có dữ liệu phân tích.</p>}
                </div>
              )}
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

import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, ShieldCheck, Share } from "lucide-react";
import { MOCK_POLLS, MOCK_POLL_ANALYTICS, MOCK_VOTER_DETAILS, PollStatus } from "@/features/polls";
import { PollDetailHeader } from "@/features/polls/components/poll-detail-header";
import { PollVoteForm } from "@/features/polls/components/poll-vote-form";
import { PollResults } from "@/features/polls/components/poll-results";

export const Route = createFileRoute("/_authenticated/polls/$pollId")({
  component: PollDetailComponent,
});

function PollDetailComponent() {
  const { pollId } = Route.useParams();

  // Find poll from mock data
  const poll = MOCK_POLLS.find((p) => p.id === pollId);
  const analytics = MOCK_POLL_ANALYTICS[pollId];
  const voterDetails = MOCK_VOTER_DETAILS[pollId];

  if (!poll) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-2xl font-semibold">Không tìm thấy cuộc bầu chọn</h2>
        <Button variant="link" asChild>
          <Link to="/dashboard">Quay lại Dashboard</Link>
        </Button>
      </div>
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
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
          <Link to="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Trở về
          </Link>
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Share className="mr-2 h-4 w-4" /> Chia sẻ
        </Button>
      </div>

      <PollDetailHeader poll={poll} />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-8 space-y-8">
          <div>
            <h3 className="text-xl font-medium mb-6">{canVote ? "Lựa chọn của bạn" : "Kết quả"}</h3>
            
            {canVote ? (
              <div className="space-y-6">
                <PollVoteForm poll={poll} onVote={handleVote} />
              </div>
            ) : (
              <div className="space-y-6">
                {hasVoted && (
                  <div className="p-4 bg-muted/30 rounded-xl flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Bạn đã tham gia bầu chọn này. Phiếu bầu đã được ghi nhận trên chuỗi.</span>
                  </div>
                )}
                {analytics ? (
                  <PollResults analytics={analytics} />
                ) : (
                  <p className="text-muted-foreground py-8 text-sm">
                    Chưa có dữ liệu phân tích.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-4 space-y-8">
          <div className="space-y-4">
            <h4 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Blockchain</h4>
            <div className="p-4 rounded-xl border border-border/50 space-y-4 bg-muted/10">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">Mạng lưới</span>
                <span className="text-sm font-medium flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 text-primary" /> Base Sepolia</span>
              </div>
              <div className="space-y-1 pt-2 border-t border-border/50">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground block">Smart Contract</span>
                <span className="text-xs font-mono break-all text-muted-foreground">0x000000000000000000</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Tất cả dữ liệu được lưu trữ vĩnh viễn và không thể giả mạo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
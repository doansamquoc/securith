import { createFileRoute } from "@tanstack/react-router";
import { PollList } from "@/features/polls/components/poll-list";
import { MOCK_POLLS } from "@/features/polls";
import DashboardStat from "@/features/home/components/dashboard-stat";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="py-8 md:py-12 container mx-auto px-4 max-w-7xl space-y-12">
      <DashboardStat />
      <PollList
        polls={MOCK_POLLS}
        title="Danh sách cuộc bầu chọn"
        description="Danh sách các cuộc bầu chọn của bạn đã tạo hoặc đã tham gia."
      />
    </div>
  );
}

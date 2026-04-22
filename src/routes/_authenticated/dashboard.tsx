import { createFileRoute } from "@tanstack/react-router";
import { PollList } from "@/features/poll/components/poll-list";
import DashboardStat from "@/features/dashboard/components/dashboard-stat";
import { MOCK_POLLS } from "@/features/poll";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="py-8 md:py-12 container mx-auto px-4 max-w-7xl space-y-12">
      <DashboardStat />
      <PollList polls={MOCK_POLLS} title="Danh sách cuộc bầu chọn" description="Danh sách các cuộc bầu chọn của bạn đã tạo hoặc đã tham gia." />
    </div>
  );
}

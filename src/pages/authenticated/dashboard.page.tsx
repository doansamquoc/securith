import { PollList } from "@/features/poll/components/poll-list";
import DashboardStat from "@/features/dashboard/components/dashboard-stat";
import { useGetPollSummaries } from "@/features/poll/hooks/use-get-poll-summaries";

export default function DashboardPage() {
  const { data, isPending, error } = useGetPollSummaries();

  return (
    <div className="py-8 md:py-12 container mx-auto px-4 max-w-7xl space-y-12">
      <DashboardStat />
      <div>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight uppercase">Danh sách cuộc bầu chọn</h2>
          <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Danh sách các cuộc bầu chọn của bạn đã tạo hoặc đã tham gia.</p>
        </div>
        <PollList polls={data ? [...data] : []} isPending={isPending} error={error!} />
      </div>
    </div>
  );
}

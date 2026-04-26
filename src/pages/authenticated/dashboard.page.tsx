import { PollList } from "@/features/poll/components/poll-list";
import DashboardStat from "@/features/dashboard/components/dashboard-stat";
import { useGetPollSummaries } from "@/features/poll/hooks/use-get-poll-summaries";
import { useGetUserStats } from "@/features/dashboard/hooks/use-get-user-stats";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";

export default function DashboardPage() {
  const { data: polls, isPending, error } = useGetPollSummaries();
  const { data: user, isLoading: isUserLoading, error: userError } = useGetUserStats();

  return (
    <div className="py-8 md:py-12 container mx-auto px-4 max-w-7xl space-y-12">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight uppercase">Bảng Điều Khiển</h1>
            <p className="text-muted-foreground text-xs font-semibold uppercase">Quản lý các cuộc bầu chọn và theo dõi hoạt động của bạn.</p>
          </div>
          <Button asChild>
            <Link to="/create">
              <IconPlus className="mr-2 h-4 w-4" /> Tạo bầu chọn
            </Link>
          </Button>
        </div>
        {userError ? (
          <div className="text-center py-20">
            <p className="text-destructive">Lỗi khi tải thống kê người dùng: {userError.message}</p>
          </div>
        ) : (
          <DashboardStat userStats={user!} isLoading={isUserLoading} />
        )}
      </div>

      <div>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight uppercase">Danh sách cuộc bầu chọn</h2>
          <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">Danh sách các cuộc bầu chọn của bạn đã tạo hoặc đã tham gia.</p>
        </div>
        <PollList polls={polls ? [...polls] : []} isPending={isPending} error={error!} />
      </div>
    </div>
  );
}

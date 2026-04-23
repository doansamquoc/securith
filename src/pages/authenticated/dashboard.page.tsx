import { PollList } from "@/features/poll/components/poll-list";
import DashboardStat from "@/features/dashboard/components/dashboard-stat";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { contract } from "@/lib/thirdweb";
import { GET_POLL_SUMMARIES } from "@/constants/contract";

export default function DashboardPage() {
  const account = useActiveAccount();

  const { data, isPending, error } = useReadContract({
    contract,
    method: GET_POLL_SUMMARIES,
    params: [account?.address ?? ""],
    queryOptions: {
      enabled: !!account?.address,
      refetchInterval: 30 * 1000,
      retry: 1,
    },
  });

  console.log("Contract data:", data, "Pending:", isPending);
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

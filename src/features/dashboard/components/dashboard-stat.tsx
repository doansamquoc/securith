import { type UserStats } from "@/features/poll";
import { IconWallet, IconChartLine, IconUsersGroup } from "@tabler/icons-react";
import { useActiveAccount } from "thirdweb/react";
import StatCard from "./stat-card";
import type { Stat } from "../../landing/types/stat.type";
import { shortenAddress } from "@/utils/utils";

interface DashboardStatProps {
  userStats: UserStats;
  isLoading: boolean;
}

const DashboardStat = ({ userStats, isLoading }: DashboardStatProps) => {
  const account = useActiveAccount();
  const address = account?.address!;
  const stats: Stat[] = [
    {
      label: "Địa chỉ ví",
      value: shortenAddress(address),
      icon: <IconWallet />,
      description: "Ví đang hoạt động",
      countEffect: false,
    },
    {
      label: "Bầu chọn đã tạo",
      value: isLoading ? 0 : Number(userStats.totalPollsCreated),
      icon: <IconChartLine />,
      description: "Tổng số cuộc bầu chọn bạn đã tạo",
      countEffect: true,
    },
    {
      label: "Tổng số lượt bầu",
      value: isLoading ? 0 : Number(userStats.totalVotesReceived),
      icon: <IconUsersGroup />,
      description: "Lượt bầu trên các cuộc bầu chọn của bạn",
      countEffect: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <StatCard stat={stat} key={index} isLoading={isLoading} />
      ))}
    </div>
  );
};

export default DashboardStat;

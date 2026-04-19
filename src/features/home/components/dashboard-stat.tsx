import { Button } from "@/components/ui/button";
import { MOCK_USER_STATS } from "@/features/polls";
import { IconWallet, IconChartLine, IconUsersGroup, IconPlus } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { useActiveAccount } from "thirdweb/react";
import StatCard from "./stat-card";
import type { Stat } from "../types/stat.type";

const DashboardStat = () => {
  const account = useActiveAccount();
  const address = account?.address || "";
  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Chưa kết nối";

  const stats: Stat[] = [
    {
      label: "Địa chỉ ví",
      value: shortAddress,
      icon: <IconWallet />,
      description: "Ví đang hoạt động",
      countEffect: false,
    },
    {
      label: "Chiến dịch đã tạo",
      value: MOCK_USER_STATS.pollsCreated.toString(),
      icon: <IconChartLine />,
      description: "Tổng số cuộc bầu chọn bạn đã tạo",
      countEffect: true,
    },
    {
      label: "Tổng số lượt bầu",
      value: MOCK_USER_STATS.totalVotesReceived.toString(),
      icon: <IconUsersGroup />,
      description: "Lượt bầu trên các cuộc bầu chọn của bạn",
      countEffect: true,
    },
  ];
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight uppercase">Bảng Điều Khiển</h1>
          <p className="text-muted-foreground text-xs font-semibold uppercase">
            Quản lý các cuộc bầu chọn và theo dõi hoạt động của bạn.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant={"outline"} asChild>
            <Link to="/analytics">
              <IconChartLine className="mr-2 h-4 w-4" /> Xem thống kê
            </Link>
          </Button>
          <Button className="" asChild>
            <Link to="/create">
              <IconPlus className="mr-2 h-4 w-4" /> Tạo bầu chọn mới
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {stats.map((stat, index) => (
          <StatCard stat={stat} key={index} />
        ))}
      </div>
    </div>
  );
};

export default DashboardStat;

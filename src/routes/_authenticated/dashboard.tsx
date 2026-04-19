import { createFileRoute, Link } from "@tanstack/react-router";
import { useActiveAccount } from "thirdweb/react";
import { Plus, Wallet, BarChart3, Users } from "lucide-react";
import { PollList } from "@/features/polls/components/poll-list";
import { MOCK_POLLS, MOCK_USER_STATS } from "@/features/polls";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const account = useActiveAccount();
  const address = account?.address || "";
  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Chưa kết nối";

  const stats = [
    { 
      label: "Địa chỉ ví", 
      value: shortAddress, 
      icon: Wallet,
      description: "Ví đang hoạt động"
    },
    { 
      label: "Chiến dịch đã tạo", 
      value: MOCK_USER_STATS.pollsCreated.toString(), 
      icon: BarChart3,
      description: "Tổng số poll bạn đã tạo"
    },
    { 
      label: "Tổng số lượt bầu", 
      value: MOCK_USER_STATS.totalVotesReceived.toString(), 
      icon: Users,
      description: "Lượt bầu trên các poll của bạn"
    },
  ];

  return (
    <div className="py-8 md:py-12 container mx-auto px-4 max-w-7xl space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Quản lý các cuộc bầu chọn và theo dõi hoạt động của bạn.</p>
        </div>
        <Button className="w-full sm:w-auto shadow-lg shadow-primary/20" asChild>
          <Link to="/create">
            <Plus className="mr-2 h-4 w-4" /> Tạo chiến dịch mới
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/60 shadow-sm transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pt-4">
        <PollList
          polls={MOCK_POLLS}
          title="Các chiến dịch gần đây"
          description="Danh sách các cuộc bầu chọn mới nhất trên hệ thống."
        />
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActiveAccount } from "thirdweb/react";
import { Plus } from "lucide-react";
import { PollList } from "@/features/polls/components/poll-list";
import { MOCK_POLLS, MOCK_USER_STATS } from "@/features/polls";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const account = useActiveAccount();
  const address = account?.address || "";
  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Chưa kết nối";

  return (
    <div className="py-12 space-y-12 container mx-auto px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">Bảng điều khiển</h1>
          <p className="text-muted-foreground">Quản lý các cuộc bầu chọn và theo dõi hoạt động của bạn.</p>
        </div>
        <Button asChild className="rounded-full">
          <Link to="/create">
            <Plus className="mr-2 h-4 w-4" /> Tạo mới
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-none rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Địa chỉ ví</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tracking-tight">{shortAddress}</div>
          </CardContent>
        </Card>
        <Card className="shadow-none rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Chiến dịch đã tạo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tracking-tight">{MOCK_USER_STATS.pollsCreated.toString()}</div>
          </CardContent>
        </Card>
        <Card className="shadow-none rounded-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Lượt bầu nhận được</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tracking-tight">{MOCK_USER_STATS.totalVotesReceived.toString()}</div>
          </CardContent>
        </Card>
      </div>

      <div className="pt-8">
        <PollList
          polls={MOCK_POLLS}
          title="Gần đây"
        />
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PollsSection } from "@/features/home/components/polls-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActiveAccount } from "thirdweb/react";
import { Wallet, PieChart, Clock } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const account = useActiveAccount();
  const address = account?.address || "";
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="py-8 space-y-8">
      {/* Dashboard Stats / Welcome */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Wallet Status</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shortAddress}</div>
            <p className="text-xs text-muted-foreground mt-1">Connected to Base Sepolia</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">My Total Votes</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Polls</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">8 ending soon</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content - Polls List */}
      <div className="border rounded-2xl bg-background/50 overflow-hidden">
         <PollsSection />
      </div>
    </div>
  );
}

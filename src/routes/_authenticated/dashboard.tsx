import { createFileRoute, Link } from "@tanstack/react-router";
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
  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not connected";

  return (
    <div className="py-12 container mx-auto px-4 max-w-6xl space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tighter">Dashboard</h1>
          <p className="text-muted-foreground">Manage your polls and track your activity.</p>
        </div>
        <Button className="rounded-full" asChild>
          <Link to="/create">
            <Plus className="mr-2 h-4 w-4" /> Create poll
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
            { label: "Wallet address", value: shortAddress },
            { label: "Polls created", value: MOCK_USER_STATS.pollsCreated.toString() },
            { label: "Total votes received", value: MOCK_USER_STATS.totalVotesReceived.toString() },
        ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-xl border bg-background">
                <div className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</div>
                <div className="text-2xl font-bold tracking-tighter">{stat.value}</div>
            </div>
        ))}
      </div>

      <div className="pt-8">
        <PollList
          polls={MOCK_POLLS}
          title="Recent polls"
        />
      </div>
    </div>
  );
}

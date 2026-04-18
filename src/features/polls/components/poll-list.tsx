import { useState } from "react";
import { type Poll, PollStatus } from "../types";
import { PollCard } from "./poll-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface PollListProps {
  polls: Poll[];
  title?: string;
  description?: string;
}

export function PollList({ polls, title = "Explore polls", description }: PollListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PollStatus | "All">("All");

  const filteredPolls = polls.filter((poll) => {
    const matchesSearch = poll.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || poll.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filterOptions = [
    { label: "All", value: "All" },
    { label: "Active", value: PollStatus.Active },
    { label: "Upcoming", value: PollStatus.NotStarted },
    { label: "Ended", value: PollStatus.Ended },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tighter">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search polls..."
            className="pl-9 rounded-full bg-muted/30 border-none shadow-none focus-visible:ring-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2">
        {filterOptions.map((opt) => (
          <button
            key={opt.label}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${
              statusFilter === opt.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80 text-muted-foreground"
            }`}
            onClick={() => setStatusFilter(opt.value as any)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {filteredPolls.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center text-sm text-muted-foreground">
          No polls found.
          <Button
            variant="link"
            className="text-xs h-auto py-0 ml-2"
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("All");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}

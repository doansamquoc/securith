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

export function PollList({ polls, title = "Khám phá", description }: PollListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PollStatus | "All">("All");

  const filteredPolls = polls.filter((poll) => {
    const matchesSearch = poll.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || poll.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filterOptions = [
    { label: "Tất cả", value: "All" },
    { label: "Đang diễn ra", value: PollStatus.Active },
    { label: "Sắp diễn ra", value: PollStatus.NotStarted },
    { label: "Đã kết thúc", value: PollStatus.Ended },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>

        <div className="flex items-center relative w-full md:w-64">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm..."
            className="pl-9 h-9 rounded-full bg-muted/30 border-border/50 shadow-none focus-visible:ring-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-border/50 w-full mb-4">
        {filterOptions.map((opt) => (
          <button
            key={opt.label}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              statusFilter === opt.value
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
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
        <div className="py-24 text-center">
          <p className="text-muted-foreground">Không tìm thấy cuộc bầu chọn nào.</p>
          <Button
            variant="link"
            className="mt-2"
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("All");
            }}
          >
            Xóa bộ lọc
          </Button>
        </div>
      )}
    </div>
  );
}

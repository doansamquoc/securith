import { useState, useMemo } from "react";
import { PollStatus, type PollSummary } from "../types/types";
import { PollCard } from "./poll-card";
import { Button } from "@/components/ui/button";
import { IconClearAll, IconFolderExclamation, IconPlus } from "@tabler/icons-react";
import { Empty, EmptyContent, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import type { SortOption } from "../types/sort.type";
import PollSearchInput from "./poll-search-input";
import PollFilter from "./poll-filter";
import PollCardSkeleton from "./poll-card-skeleton";

interface PollListProps {
  readonly polls?: PollSummary[];
  readonly isPending?: boolean;
  readonly error?: Error;
}

export function PollList({ polls, isPending, error }: PollListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PollStatus | "All">("All");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const sortedAndFilteredPolls = useMemo(() => {
    const result =
      polls?.filter((poll) => {
        const matchesSearch = poll.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All" || poll.status === statusFilter;
        return matchesSearch && matchesStatus;
      }) || [];

    // Sorting logic
    result.sort((a, b) => {
      if (sortBy === "newest") return Number(b.startsAt - a.startsAt);
      if (sortBy === "oldest") return Number(a.startsAt - b.startsAt);
      if (sortBy === "most-voted") return Number(b.totalVotes - a.totalVotes);
      return 0;
    });

    return result;
  }, [polls, searchQuery, statusFilter, sortBy]);

  return (
    <div className="space-y-6 mt-10">
      {/* Search and Filters Row */}
      <div className="flex flex-col md:flex-row justify-between gap-2">
        {/* Search input */}
        <PollSearchInput value={searchQuery} onChange={setSearchQuery} sortedAndFilteredPollsLength={sortedAndFilteredPolls.length} />
        {/* Filters */}
        <PollFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      {/* List Section */}
      <div className="space-y-3">
        {isPending ? (
          <PollCardSkeleton />
        ) : error ? (
          <div className="text-center text-destructive">Error loading polls</div>
        ) : sortedAndFilteredPolls.length > 0 ? (
          sortedAndFilteredPolls.map((poll) => <PollCard key={poll.id} poll={poll} />)
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant={"default"}>
                <IconFolderExclamation size={48} />
              </EmptyMedia>
              <EmptyTitle>Không tìm thấy kết quả</EmptyTitle>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
              <Button size="sm" variant={"outline"}>
                <IconPlus /> Tạo bầu chọn mới
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("All");
                  setSortBy("newest");
                }}
              >
                <IconClearAll /> Xóa bộ lọc
              </Button>
            </EmptyContent>
          </Empty>
        )}
      </div>
    </div>
  );
}

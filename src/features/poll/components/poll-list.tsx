import { useState, useMemo } from "react";
import { type Poll, PollStatus } from "../types";
import { PollCard } from "./poll-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { IconClearAll, IconFolderExclamation, IconPlus, IconSearch } from "@tabler/icons-react";
import { Empty, EmptyContent, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

interface PollListProps {
  polls: Poll[];
  title?: string;
  description?: string;
}

type SortOption = "newest" | "oldest" | "most-voted";

export function PollList({ polls, title, description }: PollListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PollStatus | "All">("All");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const sortedAndFilteredPolls = useMemo(() => {
    let result = polls.filter((poll) => {
      const matchesSearch = poll.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || poll.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

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
    <div className="space-y-6">
      {/* Header Info */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight uppercase">{title}</h2>
        {description && <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">{description}</p>}
      </div>

      {/* Main List Container */}
      <div className="space-y-6 mt-10">
        {/* Search and Filters Row */}
        <div className="flex flex-col md:flex-row justify-between gap-2">
          {/* Search input */}
          <InputGroup className="max-w-sm">
            <InputGroupInput placeholder="Tìm kiếm..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <InputGroupAddon>
              <IconSearch />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">{sortedAndFilteredPolls.length} Kết quả</InputGroupAddon>
          </InputGroup>

          <div className="flex flex-col md:flex-row gap-2">
            {/* Status Filter */}
            <Select value={statusFilter.toString()} onValueChange={(val) => setStatusFilter(val === "All" ? "All" : (Number(val) as PollStatus))}>
              <SelectTrigger className="w-full md:w-auto">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent position="popper" align="end">
                <SelectItem value="All">Tất cả</SelectItem>
                <SelectItem value={PollStatus.Active.toString()}>Đang diễn ra</SelectItem>
                <SelectItem value={PollStatus.NotStarted.toString()}>Sắp tới</SelectItem>
                <SelectItem value={PollStatus.Ended.toString()}>Đã kết thúc</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Filter */}
            <Select value={sortBy} onValueChange={(val) => setSortBy(val as any)}>
              <SelectTrigger className="w-full md:w-auto">
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent position="popper" align="end">
                <SelectItem value="newest">Mới nhất</SelectItem>
                <SelectItem value="most-voted">Nhiều bầu chọn nhất</SelectItem>
                <SelectItem value="oldest">Cũ nhất</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* List Section */}
        <div className="space-y-3">
          {sortedAndFilteredPolls.length > 0 ? (
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
    </div>
  );
}

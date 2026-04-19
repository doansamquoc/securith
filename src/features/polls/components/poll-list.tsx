import { useState } from "react";
import { type Poll, PollStatus } from "../types";
import { PollCard } from "./poll-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

interface PollListProps {
  polls: Poll[];
  title?: string;
  description?: string;
}

export function PollList({ polls, title = "Khám phá chiến dịch", description }: PollListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PollStatus | "All">("All");

  const filteredPolls = polls.filter((poll) => {
    const matchesSearch = poll.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || poll.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 py-4">
      {/* Header Info */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold">{description}</p>}
      </div>

      {/* Main List Container */}
      <Card className="border-border/60 shadow-none bg-background/50">
        <CardContent className="p-4 sm:p-6 space-y-6">
          {/* Search and Filters Row */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
              <Input
                placeholder="Tìm kiếm chiến dịch hoặc người tạo..."
                className="pl-9 h-10 bg-muted/30 border-border/60 focus-visible:ring-primary shadow-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="w-full lg:w-auto overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              <Tabs value={statusFilter} onValueChange={(val) => setStatusFilter(val as any)} className="w-full">
                <TabsList className="bg-transparent h-auto p-0 flex justify-start lg:justify-end gap-2 min-w-max">
                  {[
                    { label: "Tất cả", value: "All" },
                    { label: "Đang diễn ra", value: PollStatus.Active },
                    { label: "Sắp tới", value: PollStatus.NotStarted },
                    { label: "Kết thúc", value: PollStatus.Ended }
                  ].map((tab) => (
                    <TabsTrigger
                      key={tab.label}
                      value={tab.value as any}
                      className="h-9 px-4 rounded-md border border-border/60 data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:border-foreground transition-all text-xs font-bold shrink-0 shadow-none"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* List Section */}
          <div className="space-y-3">
            {filteredPolls.length > 0 ? (
              filteredPolls.map((poll) => (
                <PollCard key={poll.id} poll={poll} />
              ))
            ) : (
              <div className="py-20 flex flex-col items-center justify-center text-center">
                <Search className="h-8 w-8 text-muted-foreground/20 mb-3" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Không tìm thấy kết quả</p>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-2 text-xs font-bold"
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
          
          <div className="pt-2 flex items-center justify-between text-[10px] text-muted-foreground/60 font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-3 w-3" />
              <span>{filteredPolls.length} kết quả được tìm thấy</span>
            </div>
            <span>Securith Protocol</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

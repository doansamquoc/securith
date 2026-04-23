import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SortOption } from "../types/sort.type";
import { PollStatus } from "../types/types";

interface PollFilterProps {
  statusFilter: PollStatus | "All";
  setStatusFilter: (status: PollStatus | "All") => void;
  sortBy: SortOption;
  setSortBy: (option: SortOption) => void;
}

const PollFilter = ({ statusFilter, setStatusFilter, sortBy, setSortBy }: PollFilterProps) => {
  return (
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
  );
};

export default PollFilter;

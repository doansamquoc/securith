import type { PollResult } from "../types/types";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { IconArrowLeft, IconChartLine, IconUsersGroup } from "@tabler/icons-react";
import StatCard from "@/features/dashboard/components/stat-card";
import type { Stat } from "@/features/landing/types/stat.type";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";
import CopyButton from "@/components/copy-button";
import { shortenAddress } from "@/utils/utils";
import { formatRelativeTime, toDate } from "../utils/date-utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useContractEvents } from "thirdweb/react";
import { contract } from "@/lib/thirdweb";
import { voteCastEvent } from "@/thirdweb/84532/todo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

interface PollResultsProps {
  readonly result: PollResult;
  isPending: boolean;
}

const FILTER_OPTIONS = [
  { label: "Hôm nay", value: "43200" },
  { label: "3 ngày trước", value: "129600" },
  { label: "1 tuần trước", value: "302400" },
  { label: "1 tháng trước", value: "1296000" },
  { label: "Từ trước đến nay", value: "10000000" },
];

export function PollResults({ result, isPending }: PollResultsProps) {
  const maxVotes = result.optionsResult.reduce((max, item) => (item.totalVotes > max ? item.totalVotes : max), BigInt(0));
  const { pollId } = useParams();
  const [blockRangeStr, setBlockRangeStr] = useState<string>("302400");

  const { data: events, isLoading: isEventsLoading } = useContractEvents({
    contract,
    events: [voteCastEvent()],
    blockRange: parseInt(blockRangeStr),
  });

  const pollEvents = events?.filter((e) => e.args.pollId === BigInt(pollId!)) || [];

  const stats: Stat[] = [
    {
      label: "Số người tham gia",
      value: isPending ? 0 : Number(result.participants),
      icon: <IconChartLine />,
      description: "Số người tham gia tại cuộc bầu chọn này",
      countEffect: true,
    },
    {
      label: "Tổng số phiếu bầu",
      value: isPending ? 0 : Number(result.totalVotes),
      icon: <IconUsersGroup />,
      description: "Số phiếu bầu trong cuộc bầu chọn này",
      countEffect: true,
    },
  ];

  const chartConfig = result.optionsResult.reduce((config, item, index) => {
    config[`option${index}`] = {
      label: item.text,
      color: `var(--chart-${(index % 5) + 1})`,
    };
    return config;
  }, {} as ChartConfig);

  const chartData = result.optionsResult.map((item, index) => ({
    name: `option${index}`,
    votes: Number(item.totalVotes),
    fill: `var(--color-option${index})`,
  }));

  return (
    <div className="space-y-4">
      <Button variant={"ghost"} asChild>
        <Link to={`/polls/${pollId}`}>
          <IconArrowLeft className="mr-2" /> Trở về cuộc bầu chọn
        </Link>
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <StatCard stat={stat} key={index} isLoading={isPending} />
        ))}
      </div>

      <Card>
        <CardHeader className="px-4 md:px-6">
          <CardTitle className="text-xl font-bold">{result.title}</CardTitle>
          <CardDescription className="flex items-center text-xs font-semibold gap-2">
            <span className="flex items-center">
              Bởi {shortenAddress(result.creator)} <CopyButton textToCopy={result.creator} size={"icon-xs"} variant={"ghost"} />
            </span>
            <span>{formatRelativeTime(toDate(result.createdAt))}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2">
          <div className="space-y-6 pt-4 my-auto">
            {result.optionsResult.map((item, index) => {
              const isWinner = item.totalVotes > BigInt(0) && item.totalVotes === maxVotes;
              return (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-end gap-4">
                    <div className="space-y-1">
                      <span className={cn("text-sm font-semibold transition-colors", isWinner ? "text-primary" : "text-foreground/80")}>{item.text}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground font-semibold">{item.totalVotes.toLocaleString()} phiếu</span>
                    </div>
                  </div>
                  <Progress value={Number(item.totalVotes)} className={cn("h-2.5 bg-muted/50", isWinner ? "[&>div]:bg-primary" : "[&>div]:bg-primary/30")} />
                </div>
              );
            })}
          </div>
          <ChartContainer config={chartConfig} className="ml-auto aspect-square h-72">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
              <Pie data={chartData} dataKey="votes" nameKey="name"></Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>Danh sách người tham gia</CardTitle>
            <CardDescription>{FILTER_OPTIONS.find((opt) => opt.value === blockRangeStr)?.label || "Tùy chỉnh"}</CardDescription>
          </div>
          <Select value={blockRangeStr} onValueChange={setBlockRangeStr}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Chọn thời gian" />
            </SelectTrigger>
            <SelectContent>
              {FILTER_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ví</TableHead>
                  <TableHead>Giao dịch</TableHead>
                  <TableHead>Lựa chọn</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isEventsLoading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      Đang tải dữ liệu...
                    </TableCell>
                  </TableRow>
                ) : pollEvents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                      Chưa có người tham gia
                    </TableCell>
                  </TableRow>
                ) : (
                  pollEvents.map((event, index) => {
                    const participantAddress = event.args.voter;
                    const txHash = event.transactionHash;
                    const options = event.args.optionIndices.map((idx) => result.optionsResult[Number(idx)]?.text || "Không rõ");

                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {shortenAddress(participantAddress)}
                            <CopyButton textToCopy={participantAddress} size={"icon-xs"} variant={"ghost"} />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <a href={`https://sepolia.basescan.org/tx/${txHash}`} target="_blank" rel="noreferrer" className="hover:underline">
                              {shortenAddress(txHash)}
                            </a>
                            <CopyButton textToCopy={txHash} size={"icon-xs"} variant={"ghost"} />
                          </div>
                        </TableCell>
                        <TableCell>{options.join(", ")}</TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

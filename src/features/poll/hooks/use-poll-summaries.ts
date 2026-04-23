import { contract } from "@/lib/thirdweb";
// @ts-expect-error auto-generated missing types
import { getPollSummaries } from "@/thirdweb/84532/0x45916bd6882e0e15dfc92c1d74745d910fb62e17";
import { useQuery } from "@tanstack/react-query";
import type { PollSummary } from "../types/types";

export function usePollSummaries() {
  const { data, isLoading, error, refetch } = useQuery<PollSummary[]>({
    queryKey: ["poll-summaries", contract.address],
    queryFn: async () => {
      const rawData = await getPollSummaries({ contract });
      console.log("Raw poll summaries from contract:", rawData);
      return rawData.map((item: any) => ({
        creator: item.creator,
        id: item.id,
        title: item.title,
        pollVotes: item.pollVotes,
        status: item.status,
      }));
    },
    enabled: !!contract,
    staleTime: 30 * 1000, // 30 seconds
    refetchOnWindowFocus: true,
  });
  return { data, isLoading, error, refetch };
}

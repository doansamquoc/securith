import { useActiveAccount, useReadContract } from "thirdweb/react";
import { contract } from "@/lib/thirdweb";

export function useGetPollSummaries() {
  const account = useActiveAccount();

  const { data, isPending, error } = useReadContract({
    contract,
    method:
      "function getPollSummaries() view returns ((address creator, uint256 id, string title, uint256 participants, uint8 status, uint256 startsAt, uint256 endsAt, uint256 createdAt)[])",
    params: [],
    queryOptions: {
      enabled: !!account?.address,
      refetchInterval: 30 * 1000,
      retry: 1,
    },
    from: account?.address,
  });
  return { data, isPending, error };
}

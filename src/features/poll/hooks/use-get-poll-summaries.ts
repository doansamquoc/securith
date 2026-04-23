import { useActiveAccount, useReadContract } from "thirdweb/react";
import { contract } from "@/lib/thirdweb";
import { getPollSummaries } from "@/thirdweb/84532/0x093d2bfb95f34a0b4f26406821ad7ea43608bf34";

export function useGetPollSummaries() {
  const account = useActiveAccount();

  const { data, isPending, error } = useReadContract(getPollSummaries, {
    contract,
    user: account?.address ?? "",
    queryOptions: {
      enabled: !!account?.address,
      refetchInterval: 30 * 1000,
      retry: 1,
    },
  });

  return { data, isPending, error };
}

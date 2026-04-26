import { contract } from "@/lib/thirdweb";
import { getPollResults } from "@/thirdweb/84532/todo";
import { useActiveAccount, useReadContract } from "thirdweb/react";

export function useGetPollResult(pollId: bigint) {
  const account = useActiveAccount();
  const { data, isPending, error } = useReadContract(getPollResults, {
    contract: contract,
    pollId: pollId,
    voter: account?.address!,
    queryOptions: {
      enabled: !!account,
    },
  });
  return { data, isPending, error };
}

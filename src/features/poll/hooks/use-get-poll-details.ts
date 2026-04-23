import { useActiveAccount, useReadContract } from "thirdweb/react";
import { contract } from "@/lib/thirdweb";
import { getPollDetails } from "@/thirdweb/84532/0x093d2bfb95f34a0b4f26406821ad7ea43608bf34";

export function useGetPollDetails(pollId: bigint) {
  const account = useActiveAccount();
  const { data, isPending, error } = useReadContract(getPollDetails, {
    contract,
    voter: account?.address ?? "",
    pollId: pollId,
    queryOptions: {
      enabled: !!account?.address,
      retry: 1,
    },
  });

  return { data, isPending, error };
}

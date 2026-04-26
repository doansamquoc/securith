import { contract } from "@/lib/thirdweb";
import { getUserStats } from "@/thirdweb/84532/todo";
import { useActiveAccount, useReadContract } from "thirdweb/react";

export function useGetUserStats() {
  const account = useActiveAccount();
  const { data, isPending, error } = useReadContract(getUserStats, {
    contract: contract,
    user: account?.address!,
    queryOptions: {
      enabled: !!account?.address,
    },
  });

  return { data, isLoading: isPending, error };
}

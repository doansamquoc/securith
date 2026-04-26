import { useActiveAccount, useReadContract } from "thirdweb/react";
import { contract } from "@/lib/thirdweb";

export function useGetPollDetails(pollId: bigint) {
  const account = useActiveAccount();
  const { data, isPending, error } = useReadContract({
    contract,
    method:
      "function getPollDetails(uint256 _pollId) view returns ((address creator, string title, string description, uint256 startsAt, uint256 endsAt, string[] options, uint256 participants, uint256 totalVotes, uint8 status, (bool multiChoice, bool noDeadline, uint8 resultVisibility) settings, bool hasVoted, uint256[] votedIndices, uint256 createdAt))",
    params: [pollId],
    from: account?.address,
    queryOptions: {
      enabled: !!account?.address,
    },
  });
  return { data, isPending, error };
}

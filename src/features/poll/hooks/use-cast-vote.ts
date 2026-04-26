import { castVote, voteCastEvent } from "@/thirdweb/84532/todo";
import { client, contract } from "@/lib/thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { parseEventLogs, waitForReceipt } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import type { CastVoteInput } from "../schemas/cast-vote.schema";

export function useCastVote() {
  const { mutateAsync: send } = useSendTransaction({ payModal: false });
  async function execute(pollId: bigint, data: CastVoteInput) {
    const transaction = castVote({
      contract: contract,
      pollId: pollId,
      optionIndices: data.optionIndexes.map((index: number) => BigInt(index)),
    });
    const result = await send(transaction);
    const receipt = await waitForReceipt({ client: client, chain: baseSepolia, transactionHash: result.transactionHash });
    const events = parseEventLogs({ logs: receipt.logs, events: [voteCastEvent()] });
    return events[0].data;
  }
  return { execute };
}

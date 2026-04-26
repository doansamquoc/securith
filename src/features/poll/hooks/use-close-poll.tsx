import { client, contract } from "@/lib/thirdweb";
import { closePoll, pollClosedEvent } from "@/thirdweb/84532/todo";
import { parseEventLogs, waitForReceipt } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { useSendTransaction } from "thirdweb/react";

export function useClosePoll() {
  const { mutateAsync: send } = useSendTransaction({ payModal: false });

  async function execute(pollId: bigint) {
    const transaction = closePoll({ contract: contract, pollId: pollId });
    const result = await send(transaction);
    const receipt = await waitForReceipt({ client: client, chain: baseSepolia, transactionHash: result.transactionHash });
    const events = parseEventLogs({ logs: receipt.logs, events: [pollClosedEvent()] });
    return events.length > 0 ? events[0].args : undefined;
  }

  return { execute };
}

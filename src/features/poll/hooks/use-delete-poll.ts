import { useSendTransaction } from "thirdweb/react";
import { client, contract } from "@/lib/thirdweb";
import { waitForReceipt } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { deletePoll } from "@/thirdweb/84532/todo";

export function useDeletePoll() {
  const { mutateAsync: send, isPending, error } = useSendTransaction({ payModal: false });

  async function execute(pollId: bigint): Promise<boolean> {
    const transaction = deletePoll({
      contract,
      pollId,
    });

    const result = await send(transaction);
    const receipt = await waitForReceipt({
      client: client,
      chain: baseSepolia,
      transactionHash: result.transactionHash,
    });

    return receipt.status === "success";
  }

  return { execute, isPending, error };
}

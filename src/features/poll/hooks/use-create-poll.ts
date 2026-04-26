import { useSendTransaction } from "thirdweb/react";
import type { CreatePollInput } from "../schemas/create-poll.schema";
import { toBigInt } from "../utils/date-utils";
import { client, contract } from "@/lib/thirdweb";
import { parseEventLogs, waitForReceipt } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import { createPoll, pollCreatedEvent } from "@/thirdweb/84532/todo";

export function useCreatePoll() {
  const { mutateAsync: send } = useSendTransaction({ payModal: false });
  async function execute(data: CreatePollInput): Promise<string | undefined> {
    const transaction = createPoll({
      contract,
      title: data.title,
      desc: data.description ?? "",
      startsAt: toBigInt(data.startsAt) + 60n, // Depleyed 1 munite
      endsAt: toBigInt(data.endsAt),
      options: data.options.map((o) => o.value),
      settings: {
        multiChoice: data.settings.multiChoice,
        noDeadline: data.settings.noDeadline,
        resultVisibility: data.settings.resultVisibility,
      },
    });
    const result = await send(transaction);
    const receipt = await waitForReceipt({ client: client, chain: baseSepolia, transactionHash: result.transactionHash });
    const events = parseEventLogs({ logs: receipt.logs, events: [pollCreatedEvent()] });
    return events.length > 0 ? events[0].args.pollId.toString() : undefined;
  }
  return { execute };
}

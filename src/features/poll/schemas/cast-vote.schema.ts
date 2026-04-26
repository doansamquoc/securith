import { z } from "zod";

export const castVoteSchema = z.object({
  optionIndexes: z.array(z.number()).min(1, "Bạn phải chọn ít nhất một phương án"),
});

export type CastVoteInput = z.infer<typeof castVoteSchema>;

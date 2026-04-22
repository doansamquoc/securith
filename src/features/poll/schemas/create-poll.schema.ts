import { z } from "zod";
import { PollResultVisibility } from "../types";

export const createPollSchema = z
  .object({
    title: z.string().min(5, "Tiêu đề phải có ít nhất 5 ký tự").max(100, "Tiêu đề quá dài"),
    description: z
      .string()
      .optional()
      .transform((val) => (val === "" ? undefined : val))
      .pipe(z.string().min(10, "Mô tả phải có ít nhất 10 ký tự").optional()),

    startsAt: z.date(),
    endsAt: z.date(),
    options: z
      .array(
        z.object({
          value: z.string().min(1, "Phương án không được để trống"),
        }),
      )
      .min(2, "Phải có ít nhất 2 phương án")
      .max(10, "Tối đa 10 phương án"),
    settings: z.object({
      multiChoice: z.boolean(),
      noDeadline: z.boolean(),
      resultVisibility: z.nativeEnum(PollResultVisibility),
    }),
  })
  .refine((data) => data.startsAt.getTime() >= Date.now() - 60000, {
    message: "Thời gian bắt đầu không được ở trong quá khứ",
    path: ["startsAt"],
  })
  .refine((data) => data.settings.noDeadline || data.endsAt > data.startsAt, {
    message: "Thời gian kết thúc phải sau thời gian bắt đầu",
    path: ["endsAt"],
  });

export type CreatePollInput = z.infer<typeof createPollSchema>;

export const defaultValues: CreatePollInput = {
  title: "",
  description: "",
  options: [{ value: "" }, { value: "" }],
  startsAt: new Date(),
  endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  settings: {
    multiChoice: false,
    noDeadline: false,
    resultVisibility: 0,
  },
};

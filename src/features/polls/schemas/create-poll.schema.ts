import { z } from "zod";

export const createPollSchema = z.object({
  title: z.string().min(5, "Tiêu đề phải có ít nhất 5 ký tự").max(100, "Tiêu đề quá dài"),
  description: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự"),
  startsAt: z.date(),
  endsAt: z.date(),
  options: z.array(z.string().min(1, "Phương án không được để trống"))
    .min(2, "Phải có ít nhất 2 phương án")
    .max(10, "Tối đa 10 phương án"),
  settings: z.object({
    multiChoice: z.boolean(),
    noDeadline: z.boolean(),
  }),
}).refine((data) => data.settings.noDeadline || data.endsAt > data.startsAt, {
  message: "Thời gian kết thúc phải sau thời gian bắt đầu",
  path: ["endsAt"],
});

export type CreatePollInput = z.infer<typeof createPollSchema>;

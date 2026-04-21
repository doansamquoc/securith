import z from "zod";

export const emailSchema = z.object({
  email: z.string().email("Vui lòng nhập địa chỉ email hợp lệ"),
});

export type LoginInput = z.infer<typeof emailSchema>;

export const loginDefaultValues: LoginInput = {
  email: "",
};

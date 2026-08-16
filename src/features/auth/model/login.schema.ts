import { z } from "zod";

const mobilePattern = /^09\d{9}$/;

export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "شماره موبایل یا ایمیل را وارد کنید")
    .refine(
      (value) => z.string().email().safeParse(value).success || mobilePattern.test(value),
      "شماره موبایل یا ایمیل معتبر نیست",
    ),
  password: z.string().min(1, "رمز عبور را وارد کنید"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

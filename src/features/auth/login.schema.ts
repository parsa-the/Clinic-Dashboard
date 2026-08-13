import {z} from "zod"


export const loginSchema = z.object({
    email:z.string().email("ایمیل نامعتبر !"),
    password:z.string().min(1,"رمز عبور را وارد کنید")
})

export type LoginFormData = z.infer<typeof loginSchema>
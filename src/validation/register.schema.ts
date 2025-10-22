import exp from "constants";
import path from "path";
import { isEmailExist } from "services/client/auth.service";
import { z } from "zod";
const passwordSchema = z
    .string()
    .min(3, { message: "Password tối thiểu 3 ký tự" })
    .max(20, { message: "Password tối đa 20 ký tự" })



const emailSchema = z.string().email("Email không hợp lệ")
    .refine(async (email) => {
        const existringUser = await isEmailExist(email);
        return !existringUser;

    }, {
        message: "Email đã tồn tại",
        path: ["email"],
    });
export const RegisterSchema = z.object({
    fullName: z.string().trim().min(1, { message: "tên không được để trống" }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "password không khớp",
        path: ["confirmPassword"],
    });
export type TRegisterSchema = z.infer<typeof RegisterSchema>;
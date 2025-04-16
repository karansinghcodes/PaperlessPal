import Email from "next-auth/providers/email";
import z from "zod";


export const signInSchema = z.object({
    email:z.string().email(),
    password:z.string().min(6).max(15)
})
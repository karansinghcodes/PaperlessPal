import z from "zod"

export const verifyCodeSchema = z.object({
    verifyCode:z.string().min(6).max(6),
    email:z.string().email()

})
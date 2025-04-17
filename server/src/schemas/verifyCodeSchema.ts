import z from "zod"

export const verifyCodeSchema = z.object({
    verifyCode:z.number().min(4).max(4),
    email:z.string().email()

})
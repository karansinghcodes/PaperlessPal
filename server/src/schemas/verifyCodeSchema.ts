import z from "zod"

export const verifyCodeSchema = z.object({
    verifyCode:z.string().trim(),
    email:z.string().email()

})
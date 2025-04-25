import z from "zod";

export const createClientSchema = z.object({
    userId:z.number(),
    name:z.string(),
    address:z.string(),
    email:z.string().email(),
    phoneNumber:z.string().min(10).max(10)

})
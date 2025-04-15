import z from "zod";


export const signUpSchema = z.object({
    
    fullName: z.string().trim(),
    email: z.string().email(),
    password: z.string().min(6).max(15),

    //optional
    businessName: z.optional(z.string()),
    businessAddress: z.optional(z.string()),
    phoneNumber: z.optional(z.string())

})
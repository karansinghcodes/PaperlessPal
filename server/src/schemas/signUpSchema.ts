import z from "zod";


export const signUpSchema = z.object({
    
    firstName: z.string().trim(),
    lastname:z.string().trim(),
    email: z.string().email(),
    password: z.string().min(6).max(15),

    //optional
    companyName: z.optional(z.string()),
    companyAddress: z.optional(z.string()),
    phoneNumber: z.optional(z.string())

})
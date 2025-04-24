import z from "zod";


export const signUpSchema = z.object({
    
    firstName: z.string().trim(),
    lastName:z.string().trim(),
    email: z.string().email(),
    password: z.string().min(6).max(15),

   
})
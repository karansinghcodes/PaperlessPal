import z from "zod";

export const createClientSchema = z.object({
  name: z.optional(z.string()),
  address: z.string(),
  email: z.string().email(),
  phoneNumber: z.optional(z.string().min(10).max(10)),
  status: z.boolean(),
  addtionalNotes: z.optional(z.string().max(100))
});

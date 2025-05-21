import z from "zod";

export const createClientSchema = z.object({
  contactName: z.optional(z.string()),
  companyName: z.string(),
  address: z.string(),
  email: z.string().email(),
  phoneNumber: z.optional(z.string().min(10).max(10)),
  status: z.boolean(),
  additionalNotes: z.optional(z.string().max(100)),
});

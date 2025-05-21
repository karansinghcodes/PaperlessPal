import z from "zod";

export const clientSchema = z.object({
  companyName: z.string(),
  contactName: z.optional(z.string()),
  address: z.string(),
  email: z.string().email(),
  phoneNumber: z.optional(z.string().min(10).max(10)),
  status: z.boolean(),
  additionalNotes: z.string().max(100),
});

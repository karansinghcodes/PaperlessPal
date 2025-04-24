import z from "zod";

export const invoiceItemSchema = z.object({
  invoiceId: z.number(),
  name: z.string().min(1).max(15).trim(),
  description: z.string().length(20).trim(),
  quantity: z.number(),
  unitPrice: z.number(),
});

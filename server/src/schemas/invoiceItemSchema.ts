import z from "zod";

export const invoiceItemSchema = z.object({
  name: z.string().min(1).max(15).trim(),
  description: z.string().trim(),
  quantity: z.number(),
  unitPrice: z.number(),
  totalPrice:z.number()
});

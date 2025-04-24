import z from "zod";
import { invoiceItemSchema } from "./invoiceItemSchema";

export const createInvoiceSchema = z.object({
  userId: z.number(),
  clientId: z.number(),
  invoiceItemsDetail: invoiceItemSchema,
});

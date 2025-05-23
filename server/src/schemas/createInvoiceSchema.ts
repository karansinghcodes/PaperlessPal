import z from "zod";
import { invoiceItemSchema } from "./invoiceItemSchema";

const invoiceItemsDetail = z.array(invoiceItemSchema);

export const createInvoiceSchema = z.object({
  clientId: z.number(),
  issueDate: z.date(),
  dueDate: z.date(),
  taxPercent: z.number(),
  invoiceItemsDetail: invoiceItemsDetail,
});

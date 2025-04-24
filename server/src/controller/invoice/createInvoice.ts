import { Request, Response } from "express";
import { createInvoiceSchema } from "../../schemas/createInvoiceSchema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const invoiceData = req.body;

    const requestValidation = createInvoiceSchema.safeParse(invoiceData);

    if (requestValidation.success) {
      const invoice = {
        userId: invoiceData.userId,
        clientId: invoiceData.clientId,
      };
      const invoiceItems = invoiceData.invoiceItemsDetail;
     
      await prisma.invoice.create({
        data:invoice
      })
      
    } else {
      res.status(400).json({ message: "Invalid data send", success: false });
    }
  } catch (error: any) {
    console.error("Error creating invoice", error.message);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

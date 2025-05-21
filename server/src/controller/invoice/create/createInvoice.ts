import { Request, Response } from "express";
import { createInvoiceSchema } from "../../../schemas/createInvoiceSchema";
import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { router } from "../../..";

const prisma = new PrismaClient();

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const invoiceData = req.body;
    invoiceData.issueDate = new Date(invoiceData.issueDate);
    invoiceData.dueDate = new Date(invoiceData.dueDate);

    const requestValidation = createInvoiceSchema.safeParse(invoiceData);

    if (requestValidation.success) {
      const invoiceCount = await prisma.invoice.count({
        where: {
          userId: invoiceData.userId,
        },
      });

      const invoiceNumber = `INV-${invoiceCount + 1}`;
      const invoiceItems = invoiceData.invoiceItemsDetail;

      const subTotal = invoiceItems.reduce(
        (
          sum: number,
          item: {
            name: string;
            description: string;
            quantity: number;
            unitPrice: Decimal;
            totalPrice: Decimal;
          }
        ) => {
          return sum + Number(item.totalPrice);
        },
        0
      );
      console.log(subTotal);
      const subTotalAfterTax =
        (invoiceData.taxPercent * subTotal) / 100 + subTotal;
      console.log(subTotalAfterTax);

      const newInvoice = {
        userId: invoiceData.userId,
        clientId: invoiceData.clientId,
        invoiceNumber: invoiceNumber,
        issueDate: invoiceData.issueDate,
        dueDate: invoiceData.dueDate,
        taxPercent: invoiceData.taxPercent,
        subTotal: subTotal,
        subTotalAfterTax: subTotalAfterTax,
      };

      const invoice = await prisma.invoice.create({
        data: newInvoice,
      });
      const updatedItems = invoiceItems.map(
        (item: {
          name: string;
          description: string;
          quantity: number;
          unitPrice: Decimal;
          totalPrice: Decimal;
          taxPercent: Decimal;
          subTotal: Decimal;
          subTotalAfterTax: Decimal;
        }) => ({
          ...item,
          invoiceId: invoice.invoiceId,
        })
      );

      await prisma.item.createMany({
        data: updatedItems,
      });

      res.status(201).json({
        message: "Invoice successfully created",
        success: true,
      });
    } else {
      console.log(requestValidation.error);
      res.status(400).json({ message: "Invalid data send", success: false });
    }
  } catch (error: any) {
    console.error("Error creating invoice", error.message);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

router.post("/create-invoice", createInvoice);

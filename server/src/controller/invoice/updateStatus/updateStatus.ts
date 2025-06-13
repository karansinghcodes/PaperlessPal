import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { response } from "../../../utils/response/response";

const prisma = new PrismaClient();

export const updateStatus = async (req: Request, res: Response) => {
    try {
        const userId = req.params;
        const invoiceId = req.params;
        const newInvoiceId = invoiceId.toString();
      


        if (!userId || !invoiceId) {
            response.error(res, "Missing userId or invoiceNumber in parameters");
        }

        const updatedInvoice = await prisma.invoice.update({
            where: {

                invoiceId: newInvoiceId
            },
            data: {
                status: "paid"
            }
        });

        if (updatedInvoice) {
            response.ok(res, "Status updated successfully");
        } else {
            response.error(res, "Failed to update invoice status");
        }
    } catch (error: any) {
        console.error("Error updating invoice status:", error.message);
        response.error(res, "Internal server error");
    }
};

import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { response } from "../../../utils/response/response";

const prisma = new PrismaClient();

export const updateStatus = async (req: Request, res: Response) => {

    try {
        const userId = req.params;
        const invoiceId = req.query.id;

        const stringifiedInvoiceId = invoiceId?.toString();

        if (stringifiedInvoiceId) {
            const updatedInvoice = await prisma.invoice.update({
                where: {
                    invoiceId: stringifiedInvoiceId,
                    userId
                },
                data: {
                    status: "paid"

                }

            })
            if (updatedInvoice) {
                response.ok(res, "status updated successfully");

            }
            else {
                response.error(res, "failed to update invoice status");
            }

        }


    } catch (error: any) {
        console.error("error updateing invoice status", error.message);
        response.error(res, "Internal server error",);

    }



}
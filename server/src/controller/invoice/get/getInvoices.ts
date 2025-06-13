import { Request, Response } from "express"
import { response } from "../../../utils/response/response"
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


export const getInvoices = async (req: Request, res: Response) => {

    try {
        const userId = req.params;

        const invoices = await prisma.invoice.findMany({
            where: { userId },
            select: {
                invoiceId: true,
                invoiceNumber: true,
                subTotalAfterTax: true,
                issueDate: true,
                dueDate: true,
                status: true,
                client: {
                    select: {
                        companyName: true,
                    },
                },
            },
        });
        const updatedInvoices = invoices.map((invoice) => ({
            invoiceId: invoice.invoiceId,
            invoiceNumber: invoice.invoiceNumber,
            clientName: invoice.client.companyName,
            amount: invoice.subTotalAfterTax,
            IssueDate: invoice.issueDate,
            DueDate: invoice.dueDate,
            Status: invoice.status,
        }));

        if (invoices) {
            response.ok(res, "Invoices Fetched successfully", updatedInvoices);
        }
        else {
            response.error(res, "No invoices found", 404);
        }

    } catch (error: any) {
        console.log("Error fetching invoices", error.message)
        response.error(res, "Internal Server error");

    }


}
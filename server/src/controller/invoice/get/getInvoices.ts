import { Request, Response } from "express"
import { response } from "../../../utils/response/response"
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


export const getInvoices = async (req: Request, res: Response) => {

    try {
        const userId = req.params;

        const invoices = await prisma.invoice.findMany({
            where: {
                userId: userId
            }
        });

        if (invoices) {
            response.ok(res, "Invoices Fetched successfully", invoices);
        }
        else {
            response.error(res, "No invoices found", 404);
        }

    } catch (error: any) {
        console.log("Error fetching invoices", error.message)
        response.error(res, "Internal Server error");

    }


}
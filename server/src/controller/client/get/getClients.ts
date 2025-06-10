import { Request, Response } from "express";
import { response } from "../../../utils/response/response";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getClients = async (req: Request, res: Response) => {
    try {
        const userId = req.params;

        const clients = await prisma.client.findMany({
            where: {
                userId
            }
        });

        if (clients) {
            response.ok(res, "Clients fetched Successfully", clients)

        }
        else {
            response.error(res, "No clients found", 404);
        }
    } catch (error: any) {
        console.error("Error getting clients", error.message);
        response.error(res, "Internal Server Error");
    }

}
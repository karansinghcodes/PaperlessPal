import { Request, Response } from "express";
import { createClientSchema } from "../../../schemas/createClientSchema";
import { response } from "../../../utils/response/response";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createClient = async (req: Request, res: Response) => {
  try {

    const clientData = req.body;
    const userId = req.params;
    console.log(userId);

    const requestValidation = createClientSchema.safeParse(clientData);

    if (requestValidation.success) {
      console.log(clientData);
      const clientExists = await prisma.client.findUnique({
        where: {
          email: clientData.email,
        },
      });

      if (clientExists) {
        response.error(res, "Client already exists", 400);
      } else {
        clientData.userId = userId;
        await prisma.client.create({
          data: clientData,
        });

        response.ok(res, "Client successfully created");
      }
    } else {
      response.error(res, "Invalid data send", 400);
    }
  } catch (error: any) {
    console.error("Error creating client", error.message);
    response.error(res, "Internal server error", 500);
  }
};




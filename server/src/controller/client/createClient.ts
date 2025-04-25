import { Request, Response } from "express";
import { createClientSchema } from "../../schemas/createClientSchema";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createClient = async (req: Request, res: Response) => {
  try {
    const clientData = req.body;

    const requestValidation = createClientSchema.safeParse(clientData);

    if (requestValidation.success) {
      const clientExists = await prisma.client.findUnique({
        where: {
          email: clientData.email,
        },
      });

      if (clientExists) {
        res
          .status(400)
          .json({ message: "Client already exists", success: false });
      } else {
        await prisma.client.create({
          data: clientData,
        });

        res
          .status(201)
          .json({ message: "Client created successfully", success: true });
      }
    } else {
      res.status(400).json({ message: "Invalid data sent", success: false });
    }
  } catch (error: any) {
    console.error("Error creating client", error.message);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

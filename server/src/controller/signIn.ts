import { Request, Response } from "express";
import { signInSchema } from "../schemas/signInSchema";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const primsa = new PrismaClient();

export const signIn = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const requestValidation = signInSchema.safeParse(user);

    if (requestValidation.success) {
      const userExist = await primsa.user.findUnique({
        where: { email: user.email },
      });

      if (userExist) {
        if (userExist.isUserVerified) {
          const isPasswordCorrect = await bcrypt.compare(
            user.password,
            userExist.password
          );
          if (isPasswordCorrect) {
            const user = {
              id: userExist.id,
              email: userExist.email,
              isUserVerified: userExist.isUserVerified,
              fullName: userExist.fullName,
            };
            res.status(200).json({ user, success: true });
          } else {
            res.status(400).json({ message: "Wrong password", success: false });
          }
        } else {
           res
            .status(401)
            .json({ message: "User is not verified", success: false });
        }
      } else {
        res.status(409).json({
          message: "User does not exists with this email",
          success: false,
        });
      }
    } else {
      res.status(400).json({ message: "Invalid data sent", success: false });
    }
  } catch (error) {
    console.error("Error verifying user", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

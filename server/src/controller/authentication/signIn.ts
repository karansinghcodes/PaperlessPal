import { Request, Response } from "express";
import { signInSchema } from "../../schemas/signInSchema";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { response } from "../../utils/response/response";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../config/config";
import { router } from "../..";

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
              userId: userExist.userId,
              email: userExist.email,
              isUserVerified: userExist.isUserVerified,
              firstName: userExist.firstName,
              lastName: userExist.lastName,
            };
            const token = jwt.sign(user, jwtSecret);

            const resData = {
              user,
              token,
            };
            response.ok(res, "User successfully created", resData);
          } else {
            response.error(res, "Incorrect password");
          }
        } else {
          response.error(res, "User is not verified");
        }
      } else {
        response.error(res, "User does not exists with this email");
      }
    } else {
      response.error(res, "Invalid data sent");
    }
  } catch (error) {
    console.error("Error verifying user", error);
    response.error(res, "Internal server error");
  }
};

router.post("/sign-in", signIn);

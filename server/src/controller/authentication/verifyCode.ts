import { Request, Response } from "express";
import { verifyCodeSchema } from "../../schemas/verifyCodeSchema";
import { PrismaClient } from "@prisma/client";
import { response } from "../../utils/response/response";



const prisma = new PrismaClient();

export const verifyCode = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const requestValidation = verifyCodeSchema.safeParse(data);

    if (requestValidation.success) {
      const { email, verifyCode } = data;

      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (user) {
        const isCodeValid = user.verifyCode === verifyCode;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if (isCodeValid && isCodeNotExpired) {
          await prisma.user.update({
            where: { email: email },
            data: {
              isUserVerified: true,
            },
          });

          response.ok(res, "User verified successfully");
        } else if (!isCodeNotExpired) {
          response.error(
            res,
            "Verification code has expired,please sign up again to get a new code"
          );
        } else {
          response.error(res, "Verification code is incorrect");
        }
      } else {
        response.error(res, "No user exists with this email");
      }
    } else {
      response.error(res, "Invalid data sent");
    }
  } catch (error: any) {
    console.error("error verifying user", error.message);
    response.error(res, "Internal server error", 500);
  }
};


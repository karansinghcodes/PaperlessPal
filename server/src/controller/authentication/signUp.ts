import { Request, Response } from "express";
import { signUpSchema } from "../../schemas/signUpSchema";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../../utils/sendVerificationEmail/resend";
import { response } from "../../utils/response/response";




const prisma = new PrismaClient();

export const signUp = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const requestValidation = signUpSchema.safeParse(user);

    if (requestValidation.success) {
      const userExist = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });
      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

      if (userExist) {
        if (userExist.isUserVerified) {
          response.error(res, "User already exists with this email", 409);
        } else {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          const verifyCodeExpiry = new Date(Date.now() + 3600000);

          await prisma.user.update({
            where: { userId: userExist.userId },
            data: {
              password: hashedPassword,
              verifyCode: verifyCode,
              verifyCodeExpiry: verifyCodeExpiry,
            },
          });
        }
      } else {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        user.password = hashedPassword;
        user.verifyCode = verifyCode;
        user.verifyCodeExpiry = expiryDate;

        await prisma.user.create({
          data: user,
        });
      }

      const emailResponse = await sendVerificationEmail(
        user.email,
        user.fullName,
        verifyCode
      );

      if (!emailResponse.success) {
        response.error(res, emailResponse.message);
      } else {
        response.ok(
          res,
          "User registered successfully, please verify your email"
        );
      }
    } else {
      response.error(res, "Invalid data sent");
    }
  } catch (error: any) {
    console.error("Error registering user:", error);

    response.error(res, "Interenal server error", 500);
  }
};

import { Request, Response } from "express";
import { signUpSchema } from "../../schemas/signUpSchema";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { saltNumber } from "../../config/config";
import { sendVerificationEmail } from "../../utils/resend";

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
          res
            .status(409)
            .json({
              message: "User already exists with this email",
              success: false,
            });
        } else {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          const verifyCodeExpiry = new Date(Date.now() + 3600000);

          const updateUser = await prisma.user.update({
            where: { id: userExist.id },
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

        const newUser = await prisma.user.create({
          data: user,
        });
      }

      const emailResponse = await sendVerificationEmail(
        user.email,
        user.fullName,
        verifyCode
      );

      if (!emailResponse.success) {
        res.status(400).json({
          message: emailResponse.message,
          success: false,
        });
      } else {
        res
          .status(201)
          .json({
            message: "User registered successfully. Please verify your email",
            success: true,
          });
      }
    } else {
      res.status(400).json({ message: "Invalid data sent", success: false });
    }
  } catch (error: any) {
    console.error("Error registering user:", error);

    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

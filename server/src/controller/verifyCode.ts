import { Request, Response } from "express";
import { verifyCodeSchema } from "../schemas/verifyCodeSchema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const verifyCode = async (req: Request, res: Response) => {

    try {

        const data = req.body;
        const requestValidation = verifyCodeSchema.safeParse(data);

        if (requestValidation.success) {
            const { email, verifyCode } = data;

            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });

            if (user) {
                const isCodeValid = user.verifyCode === verifyCode;
                const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

                if (isCodeValid && isCodeNotExpired) {

                    const updateUser = await prisma.user.update({
                        where: { email: email },
                        data: {
                            isUserVerified: true
                        }
                    });

                    res.status(200).json({ message: "User verified successfully", success: true })

                }
                else if (!isCodeNotExpired) {
                    res.status(400).json({ message: "Verification code has expired,please sign up again to get a new code", success: false })
                }
                else {
                    res.status(400).json({ message: "Verification code is incorrect", success: false })
                }
            }
            else {
                res.status(400).json({ message: "No user exists with this email", success: false });

            }


        }
        else {
            res.status(400).json({ message: "Invalid data sent", success: false });
        }




    } catch (error: any) {
        console.error("error verifying user", error.message)
        res.status(500).json({ message: "Internal server error", success: false })


    }
}
import { Resend } from "resend";
import ejs from "ejs";
import fs from "fs";
import path from "path";
import { resendApiKey } from "../../config/config";

interface ApiResponse {
  message: string;
  success: boolean;
}

const resend = new Resend(resendApiKey);

export async function sendVerificationEmail(
  email: string,
  fullName: string,
  verifyCode: string
): Promise<ApiResponse> {
  const templatePath = path.resolve(
    __dirname,
    "../../../email/emailTemplate.ejs"
  );
  const template = fs.readFileSync(templatePath, "utf-8");
  const html = ejs.render(template, { fullName, verifyCode });
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "verification code",
      html,
    });

    return { message: "Verification email sent successfully", success: true };
  } catch (emailError) {
    console.error("error sending verification email", emailError);
    return { message: "Failed sending verification email", success: false };
  }
}

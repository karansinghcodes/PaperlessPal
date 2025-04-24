import z from "zod";

export const signUpSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Atleast 6 characters")
    .max(15, "Maximum 15 characters ")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Should contain at least one upper case, one lower case and one number"
    )
});

import z from "zod";


export const issueDateSchema = z.object({
    dob: z.date({
      required_error: "A date of birth is required.",
    }),
  })
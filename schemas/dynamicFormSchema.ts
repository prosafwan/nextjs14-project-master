import { z } from "zod";

// Zod schema to validate form data dynamically
export const FormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters."),
  email: z.string().min(3, "Email must be at least 3 characters."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  gender: z.enum(["male", "female"]),
  subscribe: z.boolean().optional(),
});

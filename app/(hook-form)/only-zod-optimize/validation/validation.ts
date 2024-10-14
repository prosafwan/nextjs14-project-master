import { z } from "zod";

export const formSchema = z
.object({
  name: z.string().min(2, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  age: z
    .number()
    .optional()
    .refine((val) => val === undefined || val >= 18, {
      message: "You must be at least 18",
    }),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  country: z.string().min(1, "Country is required"),
  gender: z.enum(["male", "female", "other"]),
  //   notifications: z.boolean().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  interests: z.array(z.string()).optional(), // Array of interests
  image: z
    .any()
    .refine(
      (file) => file?.size <= 5 * 1024 * 1024,
      "File must be smaller than 5MB"
    ), // Validate file size
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
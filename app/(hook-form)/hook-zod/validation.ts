import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email"),
    age: z
    .number()
    .int()
    .positive()
    .min(18, "You must be at least 18 years old")
    .optional(),
    dateOfBirth: z.string().nonempty("Date of birth is required"),
    country: z.string().nonempty("Country is required"),
    gender: z.enum(["male", "female", "other"]),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
    image: z.any().optional(),
    terms: z.boolean().refine((val) => val, "You must accept the terms"),
    interests: z.array(z.string()).nonempty("Select at least one interest"),
  }).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
  
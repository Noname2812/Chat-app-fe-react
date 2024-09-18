import { z } from "zod";

export const LoginShecma = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});
export const RegisterShecma = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .refine((value) => value.trim().length > 0, {
        message: "Name cannot be only whitespace",
      }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

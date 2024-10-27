import { z } from "zod";

export const LoginFormSchema = z.object({
  usernameOrEmail: z
    .string({
      message: "Invalid Input",
    })
    .regex(/^[a-zA-Z0-9@.]+$/, "Invalid username or email"),
  password: z.string({
    message: "password is required",
  }),
});

export const RegisterFormSchema = z.object({
  username: z
    .string({ message: "Username is required" })
    .min(3, "Username must be at least 3 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username must not contain any special characters"
    ),

  email: z
    .string({
      message: "Invalid email",
    })
    .email(),

  password: z
    .string({
      message: "password is required",
    })
    .min(6, "password must be at least 6 characters"),
});

export const OtpValidationSchema = z.object({
  otp: z.string({ message: "otp is required" }),
});

export const resetEmailSchema = z.object({
  email: z.string().email(),
});

import { z } from "zod";

export const formSchema = z.object({
  email: z
    .string({
      message: "Invalid email",
    })
    .email(),
  password: z.string({
    message: "password is required",
  }),
});

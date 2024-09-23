import { z } from "zod";

export const MessageShecma = z.object({
  content: z
    .string()
    .min(1, { message: "Message is required" })
    .refine((value) => value.trim().length > 0, {
      message: "Message cannot be only whitespace",
    }),
});

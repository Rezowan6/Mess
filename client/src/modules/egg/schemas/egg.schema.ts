import { z } from "zod";

export const eggSchema = z.object({
  memberId: z
    .number({
      message: "Please select a member",
    })
    .int()
    .positive("Please select a member"),

  quantity: z
    .number({
      message: "Egg quantity is required",
    })
    .int("Egg quantity must be a whole number")
    .min(1, "Egg quantity must be at least 1"),
});

export type EggFormValues = z.infer<typeof eggSchema>;

import { z } from "zod";

export const soldProductSchema = z.object({
  totalAmount: z
    .number({
      message: "Sold product amount is required",
    })
    .positive("Sold product amount must be greater than zero"),
});

export type SoldProductFormValues = z.infer<typeof soldProductSchema>;

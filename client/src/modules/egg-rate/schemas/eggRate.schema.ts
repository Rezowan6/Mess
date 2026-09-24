import { z } from "zod";

export const eggRateSchema = z.object({
  rate: z
    .number({
      message: "Egg rate is required",
    })
    .positive("Egg rate must be greater than zero"),
});

export type EggRateFormValues = z.infer<typeof eggRateSchema>;

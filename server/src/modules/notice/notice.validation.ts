import { z } from "zod";

export const createNoticeSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(255),

    description: z.string().min(5),
  }),
});

export const updateNoticeSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

import { z } from "zod";

export const noticeSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
});

export type NoticeFormValues = z.infer<typeof noticeSchema>;

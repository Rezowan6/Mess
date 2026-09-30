import { z } from "zod";

export const riceSchema = z
  .object({
    quantity: z.number().positive("Rice quantity must be greater than 0"),

    unitPrice: z.number().positive("Unit price must be greater than 0"),

    purchaseType: z.enum(["PAID", "CREDIT"]),

    supplierName: z
      .string()
      .trim()
      .max(100, "Supplier name is too long")
      .optional()
      .or(z.literal("")),

    supplierPhone: z
      .string()
      .trim()
      .max(20, "Supplier phone is too long")
      .optional()
      .or(z.literal("")),

    purchaseDate: z.string().optional().or(z.literal("")),

    dueDate: z.string().optional().or(z.literal("")),

    initialPaymentMethod: z
      .enum(["CASH", "BKASH", "BANK", "OTHER", ""])
      .optional(),

    initialPaymentDate: z.string().optional().or(z.literal("")),

    initialPaymentNote: z
      .string()
      .trim()
      .max(255, "Payment note is too long")
      .optional()
      .or(z.literal("")),

    note: z
      .string()
      .trim()
      .max(255, "Note is too long")
      .optional()
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.purchaseType === "PAID" && !data.initialPaymentMethod) {
      ctx.addIssue({
        code: "custom",
        path: ["initialPaymentMethod"],
        message: "Payment method is required for paid purchase",
      });
    }

    if (data.purchaseType === "CREDIT" && !data.dueDate) {
      ctx.addIssue({
        code: "custom",
        path: ["dueDate"],
        message: "Due date is required for credit purchase",
      });
    }

    if (data.purchaseType === "CREDIT" && data.initialPaymentMethod) {
      ctx.addIssue({
        code: "custom",
        path: ["initialPaymentMethod"],
        message: "Initial payment is not allowed for credit purchase",
      });
    }
  });

export type RiceFormValues = z.infer<typeof riceSchema>;

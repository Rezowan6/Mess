import { z } from "zod";

export const PAYMENT_PROVIDERS = ["BKASH", "NAGAD", "ROCKET", "BANK"] as const;

export type PaymentProvider = (typeof PAYMENT_PROVIDERS)[number];

export const PAYMENT_PROVIDER_OPTIONS: {
  label: string;
  value: PaymentProvider;
}[] = [
  { label: "bKash", value: "BKASH" },
  { label: "Nagad", value: "NAGAD" },
  { label: "Rocket", value: "ROCKET" },
  { label: "Bank", value: "BANK" },
];

const ACCOUNT_NUMBER_RULES: Record<
  PaymentProvider,
  { pattern: RegExp; message: string }
> = {
  BKASH: {
    pattern: /^01[3-9]\d{8}$/,
    message: "Enter a valid 11 digit bKash number (digits only)",
  },
  NAGAD: {
    pattern: /^01[3-9]\d{8}$/,
    message: "Enter a valid 11 digit Nagad number (digits only)",
  },
  // Rocket account number is the mobile number plus one extra digit
  ROCKET: {
    pattern: /^01[3-9]\d{8,9}$/,
    message: "Enter a valid Rocket number (11 or 12 digits, digits only)",
  },
  BANK: {
    pattern: /^\d{8,20}$/,
    message: "Enter a valid bank account number (8 to 20 digits)",
  },
};

const baseSchema = z.object({
  provider: z.enum(PAYMENT_PROVIDERS, {
    message: "Payment provider is required",
  }),
  accountName: z
    .string()
    .trim()
    .min(2, "Account name must be at least 2 characters")
    .max(150, "Account name must be at most 150 characters"),
  accountNumber: z.string().trim(),
  isDefault: z.boolean(),
});

export type PaymentMethodFormValues = z.infer<typeof baseSchema>;

const createSchema = baseSchema.superRefine((values, ctx) => {
  if (!values.accountNumber) {
    ctx.addIssue({
      code: "custom",
      path: ["accountNumber"],
      message: "Account number is required",
    });
    return;
  }

  const rule = ACCOUNT_NUMBER_RULES[values.provider];

  if (!rule.pattern.test(values.accountNumber)) {
    ctx.addIssue({
      code: "custom",
      path: ["accountNumber"],
      message: rule.message,
    });
  }
});

// Edit mode: the account number is read only, so it is not validated
export const getPaymentMethodSchema = (isEdit: boolean) =>
  isEdit ? baseSchema : createSchema;

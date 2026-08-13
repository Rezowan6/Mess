import { Ban, CheckCircle2, Clock3, RefreshCw, XCircle } from "lucide-react";

import type { PaymentStatusType } from "../types/payment.types";

export const paymentResultConfig: Record<
  PaymentStatusType,
  {
    title: string;
    description: string;
    icon: typeof CheckCircle2;
    variant: "success" | "error" | "warning" | "info" | "neutral";
  }
> = {
  pending: {
    title: "Payment Pending",
    description:
      "Your payment is still pending. Please wait and check your payment history.",
    icon: Clock3,
    variant: "warning",
  },

  processing: {
    title: "Payment Processing",
    description:
      "Your payment is currently being verified. Please do not make another payment.",
    icon: RefreshCw,
    variant: "info",
  },

  success: {
    title: "Payment Successful",
    description:
      "Your payment has been completed successfully. Your subscription will be activated shortly.",
    icon: CheckCircle2,
    variant: "success",
  },

  failed: {
    title: "Payment Failed",
    description:
      "We could not complete your payment. Please try again or choose another payment method.",
    icon: XCircle,
    variant: "error",
  },

  cancelled: {
    title: "Payment Cancelled",
    description:
      "The payment was cancelled before completion. You can try again whenever you are ready.",
    icon: Ban,
    variant: "warning",
  },

  refunded: {
    title: "Payment Refunded",
    description: "This payment has been refunded successfully.",
    icon: RefreshCw,
    variant: "neutral",
  },
};

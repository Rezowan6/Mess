import type {
  IPaymentInitiateResponse,
  IPaymentVerifyResponse,
} from "../../payment.interface.js";

import { ApiError } from "@/utils/ApiError.js";

import { PaymentStatus } from "../../payment.interface.js";
import { paymentRepository } from "../../payment.repository.js";
import type { PaymentGatewayContract } from "../payment.gateway.interface.js";
import { bkashService } from "./bkash.service.js";
import { env } from "@/configs/env.js";

export class BkashGateway implements PaymentGatewayContract {
  async initiatePayment(paymentId: number): Promise<IPaymentInitiateResponse> {
    /**
     * 1. Find payment
     */

    const payment = await paymentRepository.findById(paymentId);

    if (!payment) {
      throw new ApiError(404, "Payment not found.");
    }

    /**
     * 2. Check payment status
     *
     * Only pending payment
     * can initiate
     */

    if (payment.status !== PaymentStatus.PENDING) {
      throw new ApiError(400, "Payment already processed.");
    }

    /**
     * 3. Create invoice number
     *
     * bKash needs unique invoice
     */

    const invoiceNumber = `INV-${payment.id}-${Date.now()}`;

    /**
     * 4. Call bKash create payment API
     */
    const response = await bkashService.createPayment({
      amount: payment.amount.toString(),

      invoiceNumber,

      callbackURL: `${env.APP_URL}/api/v1/payments/webhook/BKASH`,
    });

    /**
     * 5. Validate bKash response
     */
    if (!response.paymentID || !response.bkashURL) {
      throw new ApiError(
        400,
        response.statusMessage ?? "bKash payment initiation failed.",
      );
    }
    /**
     * 6. Return common response
     *
     * PaymentService does not know
     * about bKash
     */
    return {
      success: true,

      paymentId: payment.id,

      gateway: payment.gateway,

      gatewayPaymentId: response.paymentID,

      redirectUrl: response.bkashURL,

      message: "bKash payment initiated successfully.",
    };
  }

  async verifyPayment(
    gatewayPaymentId: string,
  ): Promise<IPaymentVerifyResponse> {
    /**
     * 1. Execute payment
     *
     * bKash requires paymentID
     */
    const response = await bkashService.executePayment(gatewayPaymentId);

    /**
     * 2. Check transaction status
     */
    if (response.transactionStatus !== "Completed") {
      return {
        success: false,

        gatewayPaymentId,

        message: response.statusMessage ?? "bKash payment verification failed.",
      };
    }
    /**
     * 3. Return common format
     *
     * PaymentService does not know bKash
     */
    return {
      success: true,

      gatewayPaymentId,

      transactionId: response.trxID,

      paidAt: new Date(),

      message: "bKash payment verified successfully.",
    };
  }

  async refundPayment(transactionId: string, amount: number): Promise<boolean> {
    throw new Error("Bkash refundPayment not implemented.");
  }
}

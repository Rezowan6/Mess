import { env } from "@/configs/env.js";
import { ApiError } from "@/utils/ApiError.js";

import {
  PaymentStatus,
  type IPaymentInitiateResponse,
  type IPaymentVerifyResponse,
} from "../../payment.interface.js";
import { paymentRepository } from "../../payment.repository.js";
import type { PaymentGatewayContract } from "../payment.gateway.interface.js";
import { bkashService } from "./bkash.service.js";

export class BkashGateway implements PaymentGatewayContract {
  async initiatePayment(paymentId: number): Promise<IPaymentInitiateResponse> {
    const payment = await paymentRepository.findById(paymentId);

    if (!payment) {
      throw new ApiError(404, "Payment not found.");
    }

    if (payment.status !== PaymentStatus.PENDING) {
      throw new ApiError(
        400,
        `Payment cannot be initiated from ${payment.status} status.`,
      );
    }

    if (payment.gateway !== "BKASH") {
      throw new ApiError(400, "Payment gateway mismatch.");
    }

    const invoiceNumber = `INV-${payment.id}-${Date.now()}`;

    const callbackURL = `${env.APP_URL}/api/v1/payments/webhook/BKASH`;

    const response = await bkashService.createPayment({
      amount: payment.amount.toString(),
      invoiceNumber,
      callbackURL,
    });

    if (!response.paymentID || !response.bkashURL) {
      throw new ApiError(
        400,
        response.statusMessage || "bKash payment initiation failed.",
      );
    }

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
    if (!gatewayPaymentId?.trim()) {
      throw new ApiError(400, "bKash payment ID is required.");
    }

    const response = await bkashService.executePayment(gatewayPaymentId);

    if (response.transactionStatus !== "Completed") {
      return {
        success: false,
        gatewayPaymentId,
        message:
          response.transactionStatus || "bKash payment verification failed.",
      };
    }

    return {
      success: true,
      gatewayPaymentId,
      transactionId: response.trxID,
      paidAt: new Date(),
      gatewayResponse: response,
      message: "bKash payment verified successfully.",
    };
  }

  async refundPayment(transactionId: string, amount: number): Promise<boolean> {
    void transactionId;
    void amount;

    throw new ApiError(501, "bKash refund is not implemented yet.");
  }
}

export const bkashGateway = new BkashGateway();

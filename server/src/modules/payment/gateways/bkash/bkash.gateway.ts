import type {
  IPaymentInitiateResponse,
  IPaymentVerifyResponse,
} from "../../payment.interface.js";

import type { PaymentGatewayContract } from "../payment.gateway.interface.js";

export class BkashGateway implements PaymentGatewayContract {
  async initiatePayment(paymentId: number): Promise<IPaymentInitiateResponse> {
    throw new Error("Bkash initiatePayment not implemented.");
  }

  async verifyPayment(
    gatewayPaymentId: string,
  ): Promise<IPaymentVerifyResponse> {
    throw new Error("Bkash verifyPayment not implemented.");
  }

  async refundPayment(transactionId: string, amount: number): Promise<boolean> {
    throw new Error("Bkash refundPayment not implemented.");
  }
}

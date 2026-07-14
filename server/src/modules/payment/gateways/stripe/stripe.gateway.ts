import type {
  IPaymentInitiateResponse,
  IPaymentVerifyResponse,
} from "../../payment.interface.js";

import type { PaymentGatewayContract } from "../payment.gateway.interface.js";

export class StripeGateway implements PaymentGatewayContract {
  async initiatePayment(paymentId: number): Promise<IPaymentInitiateResponse> {
    throw new Error("Stripe initiatePayment not implemented.");
  }

  async verifyPayment(
    gatewayPaymentId: string,
  ): Promise<IPaymentVerifyResponse> {
    throw new Error("Stripe verifyPayment not implemented.");
  }
}

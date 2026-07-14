import type {
  IPaymentInitiateResponse,
  IPaymentVerifyResponse,
} from "../../payment.interface.js";

import type { PaymentGatewayContract } from "../payment.gateway.interface.js";

export class NagadGateway implements PaymentGatewayContract {
  async initiatePayment(paymentId: number): Promise<IPaymentInitiateResponse> {
    throw new Error("Nagad initiatePayment not implemented.");
  }

  async verifyPayment(
    gatewayPaymentId: string,
  ): Promise<IPaymentVerifyResponse> {
    throw new Error("Nagad verifyPayment not implemented.");
  }
}

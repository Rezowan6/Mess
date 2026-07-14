import type {
  IPaymentInitiateResponse,
  IPaymentVerifyResponse,
} from "../payment.interface.js";

export interface IPaymentGatewayProvider {
  initiatePayment(paymentId: number): Promise<IPaymentInitiateResponse>;

  verifyPayment(gatewayPaymentId: string): Promise<IPaymentVerifyResponse>;

  refundPayment?(transactionId: string, amount: number): Promise<boolean>;
}

export type PaymentGatewayContract = IPaymentGatewayProvider;

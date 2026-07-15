import type {
  IPaymentInitiateResponse,
  IPaymentVerifyResponse,
} from "../../payment.interface.js";

import type { IPaymentGatewayProvider } from "../payment.gateway.interface.js";

export class FakeGateway implements IPaymentGatewayProvider {
    async initiatePayment(paymentId: number): Promise<IPaymentInitiateResponse> {
        return {
            success: true,
            paymentId,
            gateway: "FAKE",

            gatewayPaymentId: `fake_${Date.now()}`,

            redirectUrl: "http://localhost:5173/payment/success",

            message: "Fake payment initiated successfully.",
        }
    }

    async verifyPayment(gatewayPaymentId: string): Promise<IPaymentVerifyResponse> {
        return {
            success: true,
            gatewayPaymentId,

            transactionId: `trx_${Date.now()}`,

            paidAt: new Date(),

            message: "Fake payment verified successfully",
        }
    }
}
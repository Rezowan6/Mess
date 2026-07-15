import { ApiError } from "@/utils/ApiError.js";

import { PaymentStatus } from "./payment.interface.js";

import { paymentRepository } from "./payment.repository.js";

import { subscriptionRepository } from "../subscription/subscription.repository.js";

import { SubscriptionStatus } from "../subscription/subscription.interface.js";

import sequelize from "@/configs/db.js";
import { PaymentGatewayFactory } from "./gateways/gateway.factory.js";
import type {
  ICreatePaymentInput,
  PaymentGatewayType,
} from "./payment.interface.js";

export class PaymentService {
  async create(data: ICreatePaymentInput) {
    const subscription = await subscriptionRepository.findById(
      data.subscriptionId,
    );

    if (!subscription) {
      throw new ApiError(404, "Subscription not found.");
    }

    if (subscription.tenantId !== data.tenantId) {
      throw new ApiError(
        403,
        "You are not allowed to access this subscription.",
      );
    }

    const existingSuccessPayment =
      await paymentRepository.findSuccessfulBySubscription(subscription.id);

    if (existingSuccessPayment) {
      throw new ApiError(
        400,
        "Payment already completed for this subscription.",
      );
    }

    const existingPendingPayment =
      await paymentRepository.findPendingBySubscription(subscription.id);

    if (existingPendingPayment) {
      throw new ApiError(
        400,
        "Pending payment already exists for this subscription.",
      );
    }

    // if (existingPendingPayment) {
    //   return {
    //     success: true,
    //     paymentId: existingPendingPayment.id,
    //     gateway: existingPendingPayment.gateway,
    //     gatewayPaymentId: existingPendingPayment.gatewayPaymentId ?? undefined,
    //     message: "Pending payment already exists.",
    //   };
    // }

    const payment = await sequelize.transaction(async (transaction) => {
      return await paymentRepository.createWithOptions(
        {
          tenantId: subscription.tenantId,
          subscriptionId: subscription.id,
          gateway: data.gateway,
          amount: subscription.amount,
          status: PaymentStatus.PENDING,
        },
        { transaction },
      );
    });

    const gateway = PaymentGatewayFactory.getGateway(data.gateway);

    const response = await gateway.initiatePayment(payment.id);

    await paymentRepository.update(
      { id: payment.id },
      {
        gatewayPaymentId: response.gatewayPaymentId ?? null,

        gatewayResponse: response,
      },
    );
    return response;
  }

  async webhook(gatewayName: string, payload: any) {
    /**
     * 1. Gateway validate
     */
    const gateway = PaymentGatewayFactory.getGateway(
      gatewayName as PaymentGatewayType,
    );

    /**
     * 2. Get gateway payment id
     *
     * bKash:
     * paymentID
     *
     * Stripe:
     * session id
     */
    const gatewayPaymentId = payload.paymentID || payload.gatewayPaymentId;

    if (!gatewayPaymentId) {
      throw new ApiError(400, "Gateway payment id missing.");
    }

    /**
     * 3. Verify with gateway
     */
    const response = await gateway.verifyPayment(gatewayPaymentId);

    if (!response.success) {
      throw new ApiError(
        400,
        response.message ?? "Payment verification failed.",
      );
    }

    /**
     * 4. Find payment
     */
    const payment = await paymentRepository.findOne({
      gatewayPaymentId,
    });

    if (!payment) {
      throw new ApiError(404, "Payment record not found.");
    }

    /**
     * 5. Prevent duplicate success
     */
    if (payment.status === PaymentStatus.SUCCESS) {
      return payment;
    }

    /**
     * 6. Update payment
     */
    await sequelize.transaction(async (transaction) => {
      await paymentRepository.update(
        {
          id: payment.id,
        },
        {
          status: PaymentStatus.SUCCESS,

          transactionId: response.transactionId ?? null,

          paidAt: response.paidAt ?? new Date(),

          gatewayResponse: response,
        },
        {
          transaction,
        },
      );

      /**
       * Activate subscription
       */
      await subscriptionRepository.update(
        {
          id: payment.subscriptionId,
        },
        {
          status: SubscriptionStatus.ACTIVE,
        },
        {
          transaction,
        },
      );
    });

    return response;
  }

  async verifyPayment(paymentId: number) {
    const payment = await paymentRepository.findById(paymentId);

    if (!payment) {
      throw new ApiError(404, "Payment not found.");
    }

    if (payment.status === PaymentStatus.SUCCESS) {
      throw new ApiError(400, "Payment already verified.");
    }

    const gateway = PaymentGatewayFactory.getGateway(payment.gateway);

    const response = await gateway.verifyPayment(payment.gatewayPaymentId!);

    await sequelize.transaction(async (transaction) => {
      await paymentRepository.update(
        {
          id: payment.id,
        },
        {
          status: PaymentStatus.SUCCESS,

          transactionId: response.transactionId ?? null,

          paidAt: response.paidAt ?? null,

          gatewayResponse: response,
        },
        { transaction },
      );

      await subscriptionRepository.update(
        { id: payment.subscriptionId },
        {
          status: SubscriptionStatus.ACTIVE,
        },
        { transaction },
      );
    });

    return response;
  }

  async getById(id: number) {
    const payment = await paymentRepository.findById(id);

    if (!payment) {
      throw new ApiError(404, "Payment not found.");
    }

    return payment;
  }

  async getMyPayments(tenantId: number) {
    return paymentRepository.findByTenant(tenantId);
  }

  async markAsSuccess(paymentId: number, transactionId: string) {
    const payment = await paymentRepository.findById(paymentId);

    if (!payment) {
      throw new ApiError(404, "Payment not found.");
    }

    await paymentRepository.markAsSuccess(payment.id, transactionId);

    const subscription = await subscriptionRepository.findById(
      payment.subscriptionId,
    );

    if (!subscription) {
      throw new ApiError(404, "Subscription not found.");
    }

    await subscriptionRepository.update(
      {
        id: subscription.id,
      },
      {
        status: SubscriptionStatus.ACTIVE,
      },
    );

    return paymentRepository.findById(payment.id);
  }

  async markAsFailed(paymentId: number) {
    const payment = await paymentRepository.findById(paymentId);

    if (!payment) {
      throw new ApiError(404, "Payment not found.");
    }

    await paymentRepository.markAsFailed(payment.id);

    return paymentRepository.findById(payment.id);
  }

  async markAsCancelled(paymentId: number) {
    const payment = await paymentRepository.findById(paymentId);

    if (!payment) {
      throw new ApiError(404, "Payment not found.");
    }

    await paymentRepository.markAsCancelled(payment.id);

    return paymentRepository.findById(payment.id);
  }

  async getPendingPayments() {
    return paymentRepository.findPendingPayments();
  }

  async getProcessingPayments() {
    return paymentRepository.findProcessingPayments();
  }
}

import { ApiError } from "@/utils/ApiError.js";

import { PaymentGateway, PaymentStatus } from "./payment.interface.js";

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

    if (subscription.status !== "PENDING") {
      throw new ApiError(
        400,
        "Payment can only be created for a pending subscription.",
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
      if (existingPendingPayment.gateway === data.gateway) {
        return {
          success: true,
          paymentId: existingPendingPayment.id,
          gateway: existingPendingPayment.gateway,
          gatewayPaymentId:
            existingPendingPayment.gatewayPaymentId ?? undefined,
          redirectUrl: undefined,
          message: "Pending payment already exists.",
        };
      }

      throw new ApiError(
        400,
        "A pending payment already exists for this subscription.",
      );
    }

    const payment = await sequelize.transaction(async (transaction) => {
      return paymentRepository.createWithOptions(
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

    try {
      const gateway = PaymentGatewayFactory.getGateway(data.gateway);

      const response = await gateway.initiatePayment(payment.id);

      await paymentRepository.update(
        { id: payment.id },
        {
          gatewayPaymentId: response.gatewayPaymentId ?? null,
          gatewayResponse: response,
          status: PaymentStatus.PROCESSING,
        },
      );

      return response;
    } catch (error) {
      await paymentRepository.update(
        { id: payment.id },
        {
          status: PaymentStatus.FAILED,
          failureReason:
            error instanceof Error
              ? error.message
              : "Payment initiation failed.",
        },
      );

      throw error;
    }
  }

  async webhook(gatewayName: string, payload: unknown) {
    if (!gatewayName?.trim()) {
      throw new ApiError(400, "Payment gateway is required.");
    }

    const gatewayType = gatewayName.toUpperCase() as PaymentGatewayType;

    if (!Object.values(PaymentGateway).includes(gatewayType)) {
      throw new ApiError(400, `Unsupported payment gateway: ${gatewayName}`);
    }

    if (!payload || typeof payload !== "object") {
      throw new ApiError(400, "Invalid gateway payload.");
    }

    const gateway = PaymentGatewayFactory.getGateway(gatewayType);

    const gatewayPayload = payload as Record<string, unknown>;

    const gatewayPaymentId =
      typeof gatewayPayload.paymentID === "string"
        ? gatewayPayload.paymentID
        : typeof gatewayPayload.gatewayPaymentId === "string"
          ? gatewayPayload.gatewayPaymentId
          : null;

    if (!gatewayPaymentId) {
      throw new ApiError(400, "Gateway payment id missing.");
    }

    const payment = await paymentRepository.findOne({
      gatewayPaymentId,
    });

    if (!payment) {
      throw new ApiError(404, "Payment record not found.");
    }

    if (payment.gateway !== gatewayType) {
      throw new ApiError(400, "Payment gateway mismatch.");
    }

    if (payment.status === PaymentStatus.SUCCESS) {
      return {
        success: true,
        paymentId: payment.id,
        message: "Payment already processed.",
      };
    }

    if (payment.status === PaymentStatus.CANCELLED) {
      throw new ApiError(400, "Payment has already been cancelled.");
    }

    const response = await gateway.verifyPayment(gatewayPaymentId);

    if (!response.success) {
      await paymentRepository.update(
        { id: payment.id },
        {
          status: PaymentStatus.FAILED,
          failureReason: response.message ?? "Payment verification failed.",
          gatewayResponse: response,
        },
      );

      throw new ApiError(
        400,
        response.message ?? "Payment verification failed.",
      );
    }

    await sequelize.transaction(async (transaction) => {
      const latestPayment = await paymentRepository.findByIdWithOptions(
        payment.id,
        {
          transaction,
        },
      );

      if (!latestPayment) {
        throw new ApiError(404, "Payment record not found.");
      }

      if (latestPayment.status === PaymentStatus.SUCCESS) {
        return;
      }

      await paymentRepository.update(
        { id: latestPayment.id },
        {
          status: PaymentStatus.SUCCESS,
          transactionId: response.transactionId ?? null,
          paidAt: response.paidAt ?? new Date(),
          gatewayResponse: response,
          failureReason: null,
        },
        { transaction },
      );

      await subscriptionRepository.update(
        { id: latestPayment.subscriptionId },
        {
          status: SubscriptionStatus.ACTIVE,
        },
        { transaction },
      );
    });

    return {
      success: true,
      paymentId: payment.id,
      gateway: gatewayType,
      transactionId: response.transactionId ?? null,
      paidAt: response.paidAt ?? new Date(),
      message: response.message ?? "Payment verified successfully.",
    };
  }

  async verifyPayment(paymentId: number) {
    const payment = await paymentRepository.findById(paymentId);

    if (!payment) {
      throw new ApiError(404, "Payment not found.");
    }

    if (payment.status === PaymentStatus.SUCCESS) {
      return {
        success: true,
        paymentId: payment.id,
        transactionId: payment.transactionId,
        message: "Payment already verified.",
      };
    }

    if (payment.status === PaymentStatus.CANCELLED) {
      throw new ApiError(400, "Payment has been cancelled.");
    }

    if (!payment.gatewayPaymentId) {
      throw new ApiError(400, "Gateway payment ID is missing.");
    }

    const gateway = PaymentGatewayFactory.getGateway(payment.gateway);

    const response = await gateway.verifyPayment(payment.gatewayPaymentId);

    if (!response.success) {
      await paymentRepository.update(
        { id: payment.id },
        {
          status: PaymentStatus.FAILED,
          failureReason: response.message ?? "Payment verification failed.",
          gatewayResponse: response,
        },
      );

      throw new ApiError(
        400,
        response.message ?? "Payment verification failed.",
      );
    }

    await sequelize.transaction(async (transaction) => {
      const latestPayment = await paymentRepository.findByIdWithOptions(
        payment.id,
        {
          transaction,
        },
      );

      if (!latestPayment) {
        throw new ApiError(404, "Payment not found.");
      }

      if (latestPayment.status === PaymentStatus.SUCCESS) {
        return;
      }

      await paymentRepository.update(
        { id: latestPayment.id },
        {
          status: PaymentStatus.SUCCESS,
          transactionId: response.transactionId ?? null,
          paidAt: response.paidAt ?? new Date(),
          gatewayResponse: response,
          failureReason: null,
        },
        { transaction },
      );

      await subscriptionRepository.update(
        { id: latestPayment.subscriptionId },
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

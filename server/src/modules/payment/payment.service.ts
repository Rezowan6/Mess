import { ApiError } from "@/utils/ApiError.js";

import { PaymentStatus } from "./payment.interface.js";

import { paymentRepository } from "./payment.repository.js";

import { subscriptionRepository } from "../subscription/subscription.repository.js";

import { planRepository } from "../plan/plan.repository.js";

import { SubscriptionStatus } from "../subscription/subscription.interface.js";

import type { ICreatePaymentInput } from "./payment.interface.js";

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
      return existingPendingPayment;
    }

    const plan = await planRepository.findById(subscription.planId);

    if (!plan) {
      throw new ApiError(404, "Plan not found.");
    }

    const payment = await paymentRepository.create({
      tenantId: subscription.tenantId,
      subscriptionId: subscription.id,
      gateway: data.gateway,
      amount: subscription.amount,
      status: PaymentStatus.PENDING,
    });

    return payment;
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


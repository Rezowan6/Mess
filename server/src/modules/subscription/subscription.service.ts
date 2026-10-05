import { ApiError } from "@/utils/ApiError.js";

import { Subscription } from "./subscription.model.js";
import { subscriptionRepository } from "./subscription.repository.js";

import { planRepository } from "../plan/plan.repository.js";

import { ICreateSubscriptionInput } from "./subscription.interface.js";

import { getAppDate } from "@/utils/date.util.js";
import { SubscriptionStatus } from "./subscription.interface.js";

export class SubscriptionService {
  async create(payload: ICreateSubscriptionInput): Promise<Subscription> {
    const plan = await planRepository.findById(payload.planId);

    if (!plan) {
      throw new ApiError(404, "Plan not found.");
    }

    const existingActive = await subscriptionRepository.findActiveByTenant(
      payload.tenantId,
    );

    if (existingActive) {
      throw new ApiError(409, "Tenant already has an active subscription.");
    }

    const pendingSubscription =
      await subscriptionRepository.findPendingByTenant(payload.tenantId);

    if (pendingSubscription) {
      throw new ApiError(409, "Pending subscription already exists.");
    }

    const startDate = getAppDate();

    const endDate = getAppDate();
    endDate.setDate(endDate.getDate() + plan.durationDays);

    return subscriptionRepository.create({
      tenantId: payload.tenantId,
      planId: payload.planId,

      amount: plan.monthlyPrice,

      status: SubscriptionStatus.PENDING,

      isFreeTrial: false,

      startDate,

      endDate,
    });
  }

  async getById(id: number, tenantId: number): Promise<Subscription> {
    const subscription = await subscriptionRepository.findActiveSubscriptionId(
      id,
      tenantId,
    );

    if (!subscription) {
      throw new ApiError(404, "Subscription not found.");
    }

    return subscription;
  }

  async getTenantSubscriptions(tenantId: number): Promise<Subscription[]> {
    const result = await subscriptionRepository.findByTenant(tenantId);

    if (!result.length) {
      throw new ApiError(404, "Subscriptions not found.");
    }

    return result;
  }

  async getCurrentSubscription(tenantId: number) {
    const subscription =
      await subscriptionRepository.findCurrentSubscription(tenantId);

    if (!subscription) {
      throw new ApiError(404, "No active subscription found.");
    }

    return subscription;
  }

  async activate(subscriptionId: number, tenantId: number) {
    const subscription = await this.getById(subscriptionId, tenantId);

    await subscriptionRepository.updateStatus(
      subscription.id,
      SubscriptionStatus.ACTIVE,
    );

    return this.getById(subscription.id, tenantId);
  }

  async expire(subscriptionId: number, tenantId: number) {
    const subscription = await this.getById(subscriptionId, tenantId);

    await subscriptionRepository.updateStatus(
      subscription.id,
      SubscriptionStatus.EXPIRED,
    );

    return this.getById(subscription.id, tenantId);
  }

  async cancel(subscriptionId: number, tenantId: number) {
    const subscription = await this.getById(subscriptionId, tenantId);

    await subscriptionRepository.cancelSubscription(subscription.id);

    return this.getById(subscription.id, tenantId);
  }
}

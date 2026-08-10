import { ApiError } from "@/utils/ApiError.js";

import { Subscription } from "./subscription.model.js";
import { subscriptionRepository } from "./subscription.repository.js";

import { planRepository } from "../plan/plan.repository.js";

import { ICreateSubscriptionInput } from "./subscription.interface.js";

import { SubscriptionStatus } from "./subscription.interface.js";

export class SubscriptionService {
  /**
     * 
     * @param payload Production এ পরে এটা পরিবর্তন করবো:

billingCycle: "MONTHLY" | "YEARLY"

তারপর:

amount =
billingCycle === "MONTHLY"
?
plan.monthlyPrice
:
plan.yearlyPrice

এটা Payment module করার সময় add করা ভালো হবে।
     * @returns 
     */
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

    const startDate = new Date();

    const endDate = new Date();

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

  async getById(id: number): Promise<Subscription> {
    const subscription = await subscriptionRepository.findActiveSubscriptionId(id);

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

  async activate(subscriptionId: number) {
    const subscription = await this.getById(subscriptionId);

    await subscriptionRepository.updateStatus(
      subscription.id,
      SubscriptionStatus.ACTIVE,
    );

    return this.getById(subscription.id);
  }

  async expire(subscriptionId: number) {
    const subscription = await this.getById(subscriptionId);

    await subscriptionRepository.updateStatus(
      subscription.id,
      SubscriptionStatus.EXPIRED,
    );

    return this.getById(subscription.id);
  }

  async cancel(subscriptionId: number) {
    const subscription = await this.getById(subscriptionId);

    await subscriptionRepository.cancelSubscription(subscription.id);

    return this.getById(subscription.id);
  }
}

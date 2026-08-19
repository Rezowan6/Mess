import { ApiError } from "@/utils/ApiError.js";

import { planFeatureRepository } from "../planFeature/planFeature.repository.js";
import { subscriptionRepository } from "./subscription.repository.js";

export class SubscriptionAccessService {
  async canAccess(tenantId: number, featureCode: string): Promise<boolean> {
    const subscription =
      await subscriptionRepository.findCurrentSubscription(tenantId);

    if (!subscription) {
      return false;
    }

    const planFeatures = await planFeatureRepository.findByPlanId(
      subscription.planId,
    );

    const hasFeature = planFeatures.some(
      (item) => item.feature?.slug === featureCode,
    );

    return hasFeature;
  }

  async requireFeature(tenantId: number, featureCode: string) {
    const hasAccess = await this.canAccess(tenantId, featureCode);

    if (!hasAccess) {
      throw new ApiError(
        403,
        `Your current subscription does not support ${featureCode}.`,
      );
    }

    return true;
  }
}

export const subscriptionAccessService = new SubscriptionAccessService();

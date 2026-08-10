import { BaseRepository } from "@/common/repo/base.repository.js";

import { Subscription } from "./subscription.model.js";

import {
  SubscriptionStatus,
  SubscriptionStatusType,
} from "./subscription.interface.js";

import { Op } from "sequelize";
import { Plan } from "../plan/plan.model.js";

class SubscriptionRepository extends BaseRepository<Subscription> {
  constructor() {
    super(Subscription);
  }

  async findActiveByTenant(tenantId: number): Promise<Subscription | null> {
    return this.findOne({
      tenantId,
      status: SubscriptionStatus.ACTIVE,
    });
  }

  async findActiveSubscriptionId(id: number): Promise<Subscription | null> {
    return this.findOneWithOptions({
      where: {
        id,
        status: SubscriptionStatus.ACTIVE,
      },
      include: [
        {
          model: Plan,
          association: "plan",
        },
      ],
    });
  }

  async findPendingByTenant(tenantId: number): Promise<Subscription | null> {
    return this.findOne({
      tenantId,
      status: SubscriptionStatus.PENDING,
    });
  }

  async findByTenant(tenantId: number): Promise<Subscription[]> {
    return this.findAll({
      where: {
        tenantId,
      },
      include: [
        {
          association: "plan",
          attributes: ["name", "id"],
        }
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  async findActiveSubscriptions(): Promise<Subscription[]> {
    return this.findAll({
      where: {
        status: SubscriptionStatus.ACTIVE,
      },
      order: [["createdAt", "DESC"]],
    });
  }

  async hasUsedFreeTrial(tenantId: number): Promise<boolean> {
    return this.exists({
      tenantId,
      isFreeTrial: true,
    });
  }

  async findByTenantAndPlan(
    tenantId: number,
    planId: number,
  ): Promise<Subscription | null> {
    return this.findOne({
      tenantId,
      planId,
    });
  }

  async findExpiredSubscriptions(date: Date): Promise<Subscription[]> {
    return this.findAll({
      where: {
        status: SubscriptionStatus.ACTIVE,
        endDate: {
          [Op.lt]: date,
        },
      },
    });
  }

  async updateStatus(
    id: number,
    status: SubscriptionStatusType,
  ): Promise<[number]> {
    return this.update(
      {
        id,
      },
      {
        status,
      },
    );
  }

  async findCurrentSubscription(
    tenantId: number,
  ): Promise<Subscription | null> {
    return this.findOneWithOptions({
      where: {
        tenantId,
        status: SubscriptionStatus.ACTIVE,
      },

      include: [
        {
          association: "plan",
        },
      ],
    });
  }

  async cancelSubscription(id: number): Promise<[number]> {
    return this.update(
      {
        id,
      },
      {
        status: SubscriptionStatus.CANCELLED,
      },
    );
  }
}

export const subscriptionRepository = new SubscriptionRepository();

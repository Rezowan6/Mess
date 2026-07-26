import { Transaction } from "sequelize";
import { mealEntryRepository } from "./mealEntry.repository.js";

class MealEntryGenerator {
  async createFromMealRequest(request: any, transaction: Transaction | null) {
    const exists = await mealEntryRepository.existsByRequest({
      tenantId: request.tenantId,
      mealRequestId: request.id,
    });

    if (exists) {
      return exists;
    }
    return mealEntryRepository.createWithOptions(
      {
        tenantId: request.tenantId,
        mealSessionId: request.mealSessionId,
        mealRequestId: request.id,
        userId: request.userId,

        date: request.date,

        breakfast: request.breakfast,
        lunch: request.lunch,
        dinner: request.dinner,

        guestMeal: request.guestMeal ?? 0,
      },
      {
        transaction: transaction ?? null,
      },
    );
  }

  async bulkCreateFromMealRequests(requests: any[], transaction: Transaction) {
    const entries = [];

    for (const request of requests) {
      const exists = await mealEntryRepository.existsByRequest({
        tenantId: request.tenantId,
        mealRequestId: request.id,
      });

      if (exists) {
        continue;
      }

      entries.push({
        tenantId: request.tenantId,

        userId: request.userId,

        mealSessionId: request.mealSessionId,

        mealRequestId: request.id,

        date: request.date,

        breakfast: request.breakfast,

        lunch: request.lunch,

        dinner: request.dinner,

        guestMeal: request.guestMeal ?? 0,
      });
    }

    if (!entries.length) {
      return [];
    }

    return mealEntryRepository.bulkCreateMealEntries(entries, transaction);
  }
}

export const mealEntryGenerator = new MealEntryGenerator();

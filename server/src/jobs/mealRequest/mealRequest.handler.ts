

import { mealGeneratorService } from "@/modules/mealGenerator/mealGenerator.service.js";
import { tenantRepository } from "@/modules/tenant/tenant.repository.js";
import { getCurrentMealDate } from "@/utils/mealDate.js";

export const runMealRequestGeneration = async (): Promise<void> => {
  console.log("[MealRequestJob] Meal request generation started");

  const tenants = await tenantRepository.getActiveTenants();

  /**
   * The job runs after Maghrib.
   *
   * Therefore getCurrentMealDate() will return
   * tomorrow's date.
   *
   * Example:
   *
   * Sep 1 before Maghrib → Sep 1
   * Sep 1 after Maghrib  → Sep 2
   */
  const mealDate = getCurrentMealDate();

  console.log(
    `[MealRequestJob] Generating meal requests for: ${mealDate.toISOString()}`,
  );

  for (const tenant of tenants) {
    try {
      await mealGeneratorService.generateDailyMealRequests({
        tenantId: tenant.id,
        date: mealDate,
      });

      console.log(`[MealRequestJob] Tenant ${tenant.id} generation completed`);
    } catch (error) {
      /**
       * Do not stop the whole job if one tenant fails.
       *
       * Other tenants should still get their meal requests.
       */
      console.error(
        `[MealRequestJob] Tenant ${tenant.id} generation failed:`,
        error,
      );
    }
  }

  console.log("[MealRequestJob] Meal request generation completed");
};

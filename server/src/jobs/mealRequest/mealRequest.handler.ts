import { mealGeneratorService } from "@/modules/mealGenerator/mealGenerator.service.js";
import { tenantRepository } from "@/modules/tenant/tenant.repository.js";
import { formatDisplayDate, getAppDate } from "@/utils/date.util.js";
import { logger } from "@/utils/logger.js";

export const runMealRequestGeneration = async (): Promise<void> => {
  logger.info("Meal request generation started");

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
  const mealDate = getAppDate();

  logger.info(
    { mealDate: formatDisplayDate(mealDate) },
    "Meal request generation started for date",
  );

  for (const tenant of tenants) {
    try {
      await mealGeneratorService.generateDailyMealRequests({
        tenantId: tenant.id,
        date: mealDate,
      });

      logger.info(
        { tenantId: tenant.id },
        "Tenant meal request generation completed",
      );
    } catch (error) {
      /**
       * Do not stop the whole job if one tenant fails.
       *
       * Other tenants should still get their meal requests.
       */
      logger.error(
        { tenantId: tenant.id, error },
        "Tenant meal request generation failed",
      );
    }
  }

  logger.info("Meal request generation completed");
};

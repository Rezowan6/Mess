import { mealPreferenceService } from "@/modules/MealPreference/mealPreference.service.js";
import { logger } from "@/utils/logger.js";
import cron from "node-cron";
/**
┌─ minute
│ ┌─ hour
│ │ ┌─ day of month
│ │ │ ┌─ month
│ │ │ │ ┌─ day of week
│ │ │ │ │
0 6 20 * *
 */

export const createAutoMealReqJob = () => {
  cron.schedule(
    "*/30 * * * * *", // Test: "*/30 * * * * *" | Production: "0 4 * * *"
    async () => {
      try {
        const result = await mealPreferenceService.createAutoMealReq();

        logger.info(
          {
            date: result.date,
            createdCount: result.createdCount,
            existingCount: result.existingCount,
            failedCount: result.failedCount,
            noSessionCount: result.noSessionCount,
          },
          "Auto meal request generation completed",
        );
      } catch (error) {
        logger.error({ error }, "Daily meal request generation failed");
      }
    },
    {
      name: "auto-meal-request-generation",
      timezone: "Asia/Dhaka",
      noOverlap: true,
    },
  );
};

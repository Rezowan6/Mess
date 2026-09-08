import { mealPreferenceService } from "@/modules/MealPreference/mealPreference.service.js";
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
    "0 6 * * *", // test for "*/30 * * * * *" --- production "0 4 * * *"
    async () => {
      try {
        const result = await mealPreferenceService.createAutoMealReq();

        console.log(
          `[AutoMealRequest] Completed for ${result.date.toISOString()}. ` +
            `Created: ${result.createdCount}, ` +
            `Skipped: ${result.skippedCount}`,
        );
      } catch (error) {
        console.error(
          "[AutoMealRequest] Daily meal request generation failed:",
          error,
        );
      }
    },
    {
      name: "auto-meal-request-generation",
      timezone: "Asia/Dhaka",
      noOverlap: true,
    },
  );
};

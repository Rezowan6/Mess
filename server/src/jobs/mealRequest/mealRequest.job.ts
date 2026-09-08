import { runMealRequestGeneration } from "./mealRequest.handler.js";
import { scheduleMealRequestJob } from "./mealRequest.scheduler.js";
import { getTestRunTime } from "./mealRequest.time.js";

const scheduleNext = (): void => {
  /**
   * ============================================================
   * PRODUCTION
   * ============================================================
   *
   * Every day:
   * Maghrib + 5 minutes
   */
  // const runAt = getNextMaghribTime();

  /**
   * ============================================================
   * TESTING ONLY
   * ============================================================
   *
   * Uncomment this and comment the production line
   * when testing the job.
   *
   */
  const runAt = getTestRunTime();

  console.log(
    `[MealRequestJob] Next generation scheduled at: ${runAt.toLocaleString(
      "en-BD",
      {
        timeZone: "Asia/Dhaka",
      },
    )}`,
  );

  scheduleMealRequestJob(runAt, async () => {
    try {
      console.log("[MealRequestJob] Job execution started");

      await runMealRequestGeneration();

      console.log("[MealRequestJob] Job execution completed");
    } catch (error) {
      console.error("[MealRequestJob] Job execution failed:", error);
    } finally {
      /**
       * Always schedule the next day's job.
       *
       * Even if today's generation fails,
       * the scheduler will continue.
       */
      scheduleNext();
    }
  });
};

export const startMealRequestJob = (): void => {
  console.log("[MealRequestJob] Starting scheduler...");

  scheduleNext();
};

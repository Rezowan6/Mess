import { env } from "@/configs/env.js";
import { logger } from "@/utils/logger.js";
import { runMealRequestGeneration } from "./mealRequest.handler.js";
import { scheduleMealRequestJob } from "./mealRequest.scheduler.js";
import { getNextMaghribTime } from "./mealRequest.time.js";

const scheduleNext = (): void => {
  /**
   * ============================================================
   * PRODUCTION
   * ============================================================
   *
   * Every day:
   * Maghrib + 5 minutes
   */
  const runAt = getNextMaghribTime();

  /**
   * ============================================================
   * TESTING ONLY
   * ============================================================
   *
   * Uncomment this and comment the production line
   * when testing the job.
   *
   */
  // const runAt = getTestRunTime();

  logger.info(
    {
      runAt: runAt.toLocaleString("en-BD", {
        timeZone: env.APP_TIMEZONE,
      }),
    },
    "Next meal request generation scheduled",
  );

  scheduleMealRequestJob(runAt, async () => {
    try {
      logger.info("Meal request job execution started");
      await runMealRequestGeneration();

      logger.info("Meal request job execution completed");
    } catch (error) {
      logger.error({ error }, "Meal request job execution failed");
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
  logger.info("Meal request scheduler starting");

  scheduleNext();
};

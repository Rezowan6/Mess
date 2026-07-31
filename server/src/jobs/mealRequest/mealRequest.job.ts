import { runMealRequestGeneration } from "./mealRequest.handler.js";
import { scheduleMealRequestJob } from "./mealRequest.scheduler.js";
import { getNextMaghribTime } from "./mealRequest.time.js";

const scheduleNext = () => {
  const runAt = getNextMaghribTime();

  console.log(`Next meal request generation: ${runAt.toLocaleString()}`);

  scheduleMealRequestJob(runAt, async () => {
    try {
      await runMealRequestGeneration();
    } finally {
      scheduleNext();
    }
  });
};

export const startMealRequestJob = () => {
  scheduleNext();
};

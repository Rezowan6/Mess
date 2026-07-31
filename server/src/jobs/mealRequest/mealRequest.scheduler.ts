import schedule from "node-schedule";

let mealRequestJob: schedule.Job | null = null;

export const cancelMealRequestJob = () => {
  mealRequestJob?.cancel();
};

export const scheduleMealRequestJob = (
  runAt: Date,
  callback: () => Promise<void>,
) => {
  cancelMealRequestJob();

  mealRequestJob = schedule.scheduleJob(runAt, callback);
};

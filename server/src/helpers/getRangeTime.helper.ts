import { appTime } from "@/configs/time.js";

export const getRangeTime = (date: Date | string) => {
  const day = appTime(date);

  return {
    start: day.startOf("day").toDate(),
    end: day.endOf("day").toDate(),
  };
};

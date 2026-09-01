import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone.js";
import utc from "dayjs/plugin/utc.js";
import { env } from "./env.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const APP_TIMEZONE = env.APP_TIMEZONE || "Asia/Dhaka";

export const appTime = (date?: Date | string | number) => {
  return dayjs(date).tz(APP_TIMEZONE);
};

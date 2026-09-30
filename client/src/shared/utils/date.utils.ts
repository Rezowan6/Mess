import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const APP_TIMEZONE = "Asia/Dhaka";

export const getLocalDate = () => {
  return dayjs().tz(APP_TIMEZONE).format("YYYY-MM-DD");
};

export const formatDate = (date: string | Date | null): string => {
  if (!date) return "N/A";

  return dayjs(date).tz(APP_TIMEZONE).format("DD MMM YYYY");
};

export const formatDateForChart = (date: string | Date | null): string => {
  if (!date) return "N/A";

  return dayjs(date).tz(APP_TIMEZONE).format("DD MMM");
};

export const formatMonthName = (month: number): string => {
  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return "Unknown";
  }

  return dayjs()
    .tz(APP_TIMEZONE)
    .month(month - 1)
    .format("MMMM");
};

export const formatDateForInput = (date: string | Date | null): string => {
  if (!date) return "";

  return dayjs(date).tz(APP_TIMEZONE).format("YYYY-MM-DD");
};

export const isLocked = (createdAt: string | Date | null): boolean => {
  if (!createdAt) return true;

  const created = dayjs(createdAt).tz(APP_TIMEZONE);
  const now = dayjs().tz(APP_TIMEZONE);

  // Current day পার হয়ে গেলে locked
  if (!created.isSame(now, "day")) {
    return true;
  }

  // Created হওয়ার 2 ঘণ্টা পার হলে locked
  return now.diff(created, "hour", true) >= 2;
};

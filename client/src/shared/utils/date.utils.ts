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

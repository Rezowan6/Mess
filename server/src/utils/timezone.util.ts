import { formatInTimeZone, fromZonedTime } from "date-fns-tz";

export const APP_TIMEZONE = "Asia/Dhaka";

/**
 * Get current date/time in application timezone.
 */
export const getAppNow = (): Date => {
  return fromZonedTime(
    formatInTimeZone(new Date(), APP_TIMEZONE, "yyyy-MM-dd HH:mm:ss"),
    APP_TIMEZONE,
  );
};

/**
 * Convert a Date to application timezone.
 */
export const toAppTimezone = (date: Date): Date => {
  return fromZonedTime(
    formatInTimeZone(date, APP_TIMEZONE, "yyyy-MM-dd HH:mm:ss"),
    APP_TIMEZONE,
  );
};

/**
 * Create a date using a specific time in application timezone.
 *
 * Example:
 * createAppTime(date, 10, 0)
 * => 10:00 AM Asia/Dhaka
 */
export const createAppTime = (
  date: Date,
  hours: number,
  minutes: number,
): Date => {
  const dateString = formatInTimeZone(date, APP_TIMEZONE, "yyyy-MM-dd");

  return fromZonedTime(
    `${dateString} ${String(hours).padStart(2, "0")}:${String(
      minutes,
    ).padStart(2, "0")}:00`,
    APP_TIMEZONE,
  );
};
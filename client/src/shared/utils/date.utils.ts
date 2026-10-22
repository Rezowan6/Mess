import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const APP_TIMEZONE = "Asia/Dhaka";

export const getLocalDate = () => {
  return dayjs().tz(APP_TIMEZONE).format("YYYY-MM-DD");
};

import "dayjs/locale/bn-bd";

// not used
export const formatDateByBangla = (date: string | Date | null): string => {
  if (!date) return "N/A";

  return dayjs(date).tz(APP_TIMEZONE).locale("bn-bd").format("DD MMM");
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

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

// label = month name shown to the user, value = month number sent to the server
export const MONTH_OPTIONS = MONTH_NAMES.map((label, index) => ({
  label,
  value: index + 1,
}));

// Always the Dhaka calendar month, not the device timezone
export const getCurrentMonthYear = () => {
  const now = dayjs().tz(APP_TIMEZONE);
  const month = now.month() + 1;

  return { month, monthName: MONTH_NAMES[month - 1], year: now.year() };
};

// Current year first, then older years
export const getYearOptions = (yearsBack = 2) => {
  const { year } = getCurrentMonthYear();

  return Array.from({ length: yearsBack + 1 }, (_, index) => ({
    label: String(year - index),
    value: year - index,
  }));
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

/**
 * Mirrors the backend rule: a record can be edited or deleted within `lockHours` of creation.
 * This only controls the UI. The backend is the real authority.
 */
export const isRecordLocked = (
  createdAt: string | Date | null,
  lockHours = 24,
): boolean => {
  if (!createdAt) return true;

  const created = dayjs(createdAt);

  // Invalid date: lock, same as the backend
  if (!created.isValid()) return true;

  return dayjs().diff(created, "hour", true) > lockHours;
};

/**
 * Returns true if a record was actually edited after creation.
 * A small tolerance avoids false positives when the record is
 * saved twice within the same request (createdAt and updatedAt differ by a few ms).
 */
export const isRecordUpdated = (
  createdAt: string | Date | null,
  updatedAt: string | Date | null,
  toleranceSeconds = 1,
): boolean => {
  if (!createdAt || !updatedAt) return false;

  const created = dayjs(createdAt);
  const updated = dayjs(updatedAt);

  if (!created.isValid() || !updated.isValid()) return false;

  return updated.diff(created, "second", true) > toleranceSeconds;
};

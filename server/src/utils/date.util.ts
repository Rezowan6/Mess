import dayjs from "dayjs";

import { appTime } from "@/configs/time.js";

const HAS_OFFSET = /(Z|[+-]\d{2}:?\d{2})$/i;

// Turns any input into one exact moment, so the comparison never depends on a timezone
const toInstant = (value: Date | string | number) => {
  if (typeof value === "string" && !HAS_OFFSET.test(value.trim())) {
    // Plain DB string without an offset: Sequelize stores UTC by default
    return dayjs.utc(value);
  }

  return dayjs(value);
};

export const getHoursDifference = (
  from: Date | string | number,
  to: Date | string | number = Date.now(),
): number => {
  return toInstant(to).diff(toInstant(from), "hour", true);
};

export const isWithinHours = (
  date: Date | string | number,
  hours: number,
): boolean => {
  const diff = getHoursDifference(date);

  // Invalid dates give NaN, which is treated as "not within"
  return Number.isFinite(diff) && diff <= hours;
};

export const getCurrentDate = (): string => {
  return appTime().format("YYYY-MM-DD");
};

// ================================

// done and use
export const formatDate = (date: Date): string => {
  return appTime(date).format("YYYY-MM-DD");
};
export const getAppDate = (date?: Date | string | number): Date => {
  return appTime(date).startOf("day").toDate();
};

export const isSameDate = (
  firstDate: Date | string | number | null | undefined,
  secondDate: Date | string | number | null | undefined,
): boolean => {
  if (!firstDate || !secondDate) {
    return false;
  }

  return (
    appTime(firstDate).format("YYYY-MM-DD") ===
    appTime(secondDate).format("YYYY-MM-DD")
  );
};

export const getMonthName = (month: number, year: number): string => {
  return new Date(year, month - 1).toLocaleString("default", {
    month: "long",
  });
};

export const getCurrentMonthAndYear = () => {
  const now = appTime();

  return {
    month: now.month() + 1, // 1-12
    year: now.year(),
  };
};

export const formatDisplayDate = (date: Date | string | number): string => {
  return appTime(date).format("DD MMM YYYY");
};

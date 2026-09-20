import { appTime } from "@/configs/time.js";
// ================================
// ingsa-allah ai 3 ta method update korte hobe
export const getHoursDifference = (
  from: Date | string | number,
  to: Date | string | number = new Date(),
): number => {
  return appTime(to).diff(appTime(from), "hour", true);
};

export const isWithinHours = (
  date: Date | string | number,
  hours: number,
): boolean => {
  return getHoursDifference(date) <= hours;
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

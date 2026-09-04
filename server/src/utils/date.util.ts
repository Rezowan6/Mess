import { appTime } from "@/configs/time.js";

export const getHoursDifference = (
  from: Date,
  to: Date = new Date(),
): number => {
  return (to.getTime() - from.getTime()) / (1000 * 60 * 60);
};

export const isWithinHours = (date: Date | string, hours: number): boolean => {
  const targetDate = new Date(date);
  const diffHours = (Date.now() - targetDate.getTime()) / (1000 * 60 * 60);

  return diffHours <= hours;
};

export const getCurrentDate = (): string => {
  return new Date().toISOString().split("T")[0] as string;
};

// done and use
export const formatDate = (date: Date): string => {
  return appTime(date).format("YYYY-MM-DD");
};

export const getMonthName = (month: number, year: number): string => {
  return new Date(year, month - 1).toLocaleString("default", {
    month: "long",
  });
};

export const getCurrentMonthAndYear = () => {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  return {
    month,
    year,
  };
};

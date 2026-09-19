import dayjs from "dayjs";

export const sortByDateDesc = <T>(
  items: T[],
  getDate: (item: T) => string | Date,
): T[] => {
  return [...items].sort(
    (a, b) => dayjs(getDate(b)).valueOf() - dayjs(getDate(a)).valueOf(),
  );
};

export const sortByIdAsc = <T extends { id: number }>(items: T[]): T[] => {
  return [...items].sort((a, b) => a.id - b.id);
};

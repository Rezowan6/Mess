import dayjs from "dayjs";

export const sortByDateDesc = <T>(
  items: T[],
  getDate: (item: T) => string | Date,
): T[] => {
  return [...items].sort(
    (a, b) => dayjs(getDate(b)).valueOf() - dayjs(getDate(a)).valueOf(),
  );
};

export const sortBy = <T>(
  items: readonly T[],
  getValue: (item: T) => number | string,
  order: "asc" | "desc" = "asc",
): T[] => {
  const direction = order === "asc" ? 1 : -1;

  return [...items].sort((a, b) => {
    const x = getValue(a);
    const y = getValue(b);

    if (typeof x === "number" && typeof y === "number") {
      return (x - y) * direction;
    }
    return String(x).localeCompare(String(y)) * direction;
  });
};

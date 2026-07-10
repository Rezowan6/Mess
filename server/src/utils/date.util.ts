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

export const groupByDate = <T>(items: T[], getDate: (item: T) => string) => {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const date = getDate(item);

    if (!groups[date]) {
      groups[date] = [];
    }

    groups[date].push(item);

    return groups;
  }, {});
};

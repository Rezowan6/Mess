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

export const groupBy = <T, K>(
  items: readonly T[],
  getKey: (item: T) => K,
): Map<K, T[]> => {
  const grouped = new Map<K, T[]>();

  for (const item of items) {
    const key = getKey(item);
    const group = grouped.get(key);

    if (group) group.push(item);
    else grouped.set(key, [item]);
  }

  return grouped;
};


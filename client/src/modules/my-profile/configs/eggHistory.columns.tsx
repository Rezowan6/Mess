import dayjs from "dayjs";

import type { TableColumn } from "@/shared/components/ui/Table";

interface IEggHistory {
  id: number;
  quantity: number | string;
  eggDate: string;
  createdAt: string;
}

export const useEggHistoryColumns = (): TableColumn<IEggHistory>[] => {
  return [
    {
      key: "eggDate",
      title: "Date",
      render: (egg) => dayjs(egg.eggDate).format("DD MMM YYYY"),
    },
    {
      key: "quantity",
      title: "Quantity",
      render: (egg) => `${Number(egg.quantity).toFixed(2)} Eggs`,
    },
  ];
};

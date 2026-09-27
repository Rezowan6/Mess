import type { TableColumn } from "@/shared/components/ui/Table";
import { formatDate } from "@/shared/utils/date.utils";

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
      render: (egg) => formatDate(egg.eggDate),
    },
    {
      key: "quantity",
      title: "Quantity",
      render: (egg) => `${Number(egg.quantity).toFixed(2)} Eggs`,
    },
  ];
};

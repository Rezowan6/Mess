import type { TableColumn } from "@/shared/components/ui/Table";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { formatDate } from "@/shared/utils/date.utils";
import type { IEgg } from "../types/egg.types";
import { EggHistoryAction } from "../components/EggHistoryAction";

export const eggHistoryColumns = (
  onEdit: (egg: IEgg) => void,
): TableColumn<IEgg>[] => {
  const { can } = useRBAC();

  const column: TableColumn<IEgg>[] = [
    {
      key: "eggDate",
      title: "Date",
      render: (egg) => formatDate(egg?.eggDate),
    },
    {
      key: "quantity",
      title: "Egg Quantity",
      render: (egg) => egg.quantity,
    },
  ];

  if (can(PERMISSIONS.EXPENSE_CREATE)) {
    column.push({
      key: "action",
      title: "Action",
      render: (egg) => <EggHistoryAction egg={egg} onEdit={onEdit} />,
    });
  }

  return column;
};

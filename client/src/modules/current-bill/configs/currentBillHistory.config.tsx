import type { TableColumn } from "@/shared/components/ui/Table";



import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { formatDate } from "@/shared/utils/date.utils";
import type { ICurrentBill } from "../types/currentBill.types";
import { CurrentBillAction } from "../components/currentBillAction";

export const useCurrentBillHistoryColumns = (
  onEdit: (currentBill: ICurrentBill) => void,
): TableColumn<ICurrentBill>[] => {
  const { can } = useRBAC();

  const columns: TableColumn<ICurrentBill>[] = [
    {
      key: "sl",
      title: "#",
      render: (_, index) => index + 1,
    },
    {
      key: "date",
      title: "Date",
      render: (currentBill) => formatDate(currentBill.createAt),
    },
    {
      key: "amount",
      title: "Amount",
      render: (deposit) => `৳ ${deposit.amount}`,
    },
    {
      key: "paymentMethod",
      title: "Payment Method",
      render: (currentBill) => currentBill.paymentMethod
    },
  ];

  if (can(PERMISSIONS.DEPOSIT_UPDATE) || can(PERMISSIONS.DEPOSIT_DELETE)) {
    columns.push({
      key: "actions",
      title: "Actions",
      className: "w-28",
      render: (currentBill) => <CurrentBillAction currentBill={currentBill} onEdit={onEdit} />,
    });
  }

  return columns;
};

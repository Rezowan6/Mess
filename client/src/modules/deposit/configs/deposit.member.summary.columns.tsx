import type { TableColumn } from "@/shared/components/ui/Table";

import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { Link } from "react-router-dom";
import type { IDeposit } from "../types/deposit.types";

export const useDepositMemberSummaryColumns = (): TableColumn<IDeposit>[] => {
  const { can } = useRBAC();

  const columns: TableColumn<IDeposit>[] = [
    {
      key: "member",
      title: "Member",
      render: (deposit) => deposit.member.name,
    },
    {
      key: "amount",
      title: "Total Amount",
      render: (deposit) => deposit.totalDeposit,
    },
  ];

  if (can(PERMISSIONS.DEPOSIT_DELETE || PERMISSIONS.DEPOSIT_UPDATE)) {
    columns.push({
      key: "history",
      title: "History",
      render: (deposit) => (
        <Link
          state={deposit}
          to={`${ROUTES.DEPOSIT}/history`}
          className="text-xs hover:border-b border-primary text-yellow-300"
        >
          History
        </Link>
      ),
    });
  }

  return columns;
};

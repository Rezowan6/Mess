import type { TableColumn } from "@/shared/components/ui/Table";

import { ActionLink } from "@/shared/components/ui/ActionLink";
import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import { ROUTES } from "@/shared/constants/routes";
import type { ICurrentBill } from "../types/currentBill.types";
import { useDepositTablePermissions } from "@/modules/deposit/configs/deposit.columns.permission";

export const useCurrentBillsColumns = (): TableColumn<ICurrentBill>[] => {
  const { canViewDetails } = useDepositTablePermissions();

  const columns: TableColumn<ICurrentBill>[] = [
    {
      key: "member",
      title: "Member",
      render: (currentBill) => (
        <MemberAvatar
          name={currentBill.member?.name}
          avatar={currentBill.member?.avatar}
        />
      ),
    },
    {
      key: "amount",
      title: "Total Amount",
      render: (currentBill) => currentBill.amount,
    },
  ];

  if (canViewDetails) {
    columns.push({
      key: "action",
      title: "Actions",
      render: (currentBill) => (
        <ActionLink
          state={currentBill}
          to={`${ROUTES.CURRENT_BILL}/history/${currentBill.userId}`}
        >
          Details
        </ActionLink>
      ),
    });
  }

  return columns;
};

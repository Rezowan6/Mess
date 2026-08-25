import type { TableColumn } from "@/shared/components/ui/Table";

import { ActionLink } from "@/shared/components/ui/ActionLink";
import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { useRBAC } from "@/shared/hooks/useRBAC";
import type { IDeposit } from "../types/deposit.types";

export const useDepositMemberSummaryColumns = (): TableColumn<IDeposit>[] => {
  const { can } = useRBAC();

  const columns: TableColumn<IDeposit>[] = [
    {
      key: "member",
      title: "Member",
      render: (deposit) => (
        <MemberAvatar
          name={deposit.member?.name}
          avatar={deposit.member?.avatar}
        />
      ),
    },
    {
      key: "amount",
      title: "Total Amount",
      render: (deposit) => deposit.totalDeposit,
    },
  ];

  if (can(PERMISSIONS.DEPOSIT_DELETE || PERMISSIONS.DEPOSIT_UPDATE)) {
    columns.push({
      key: "action",
      title: "Actions",
      render: (deposit) => (
        <ActionLink state={deposit} to={`${ROUTES.DEPOSIT}/history`}>
          Details
        </ActionLink>
      ),
    });
  }

  return columns;
};

import type { TableColumn } from "@/shared/components/ui/Table";

import { ActionLink } from "@/shared/components/ui/ActionLink";
import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import { ROUTES } from "@/shared/constants/routes";
import type { IDeposit } from "../types/deposit.types";
import { useDepositTablePermissions } from "./deposit.columns.permission";

export const useDepositMemberSummaryColumns = (): TableColumn<IDeposit>[] => {
  const { canViewDetails } = useDepositTablePermissions();

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

  if (canViewDetails) {
    columns.push({
      key: "action",
      title: "Actions",
      render: (deposit) => (
        <ActionLink
          state={deposit}
          to={`${ROUTES.DEPOSIT}/history/${deposit.memberId}`}
        >
          Details
        </ActionLink>
      ),
    });
  }

  return columns;
};

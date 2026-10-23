import type { TableColumn } from "@/shared/components/ui/Table";

import { ActionLink } from "@/shared/components/ui/ActionLink";
import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { formatTaka } from "@/shared/utils/format.utils";
import type { IDeposit } from "../types/deposit.types";

export const useDepositMemberSummaryColumns = (): TableColumn<IDeposit>[] => {
  const columns: TableColumn<IDeposit>[] = [
    {
      key: "member",
      title: "Member",
      render: (deposit) => (
        <ActionLink
          to={`${ROUTES.DEPOSIT}/history/${deposit.memberId}`}
          state={deposit}
          permission={PERMISSIONS.DEPOSIT_CREATE}
          onDenied="plain"
          showIcon={false}
          showHoverBorder={false}
        >
          <MemberAvatar
            name={deposit.member?.name}
            avatar={deposit.member?.avatar}
          />
        </ActionLink>
      ),
    },
    {
      key: "amount",
      title: "Total Amount",
      render: (deposit) => formatTaka(deposit.totalDeposit),
    },
  ];

  return columns;
};

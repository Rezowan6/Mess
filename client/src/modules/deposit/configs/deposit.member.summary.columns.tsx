import type { TableColumn } from "@/shared/components/ui/Table";

import { ActionLink } from "@/shared/components/ui/ActionLink";
import { Avatar } from "@/shared/components/ui/Avatar";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { getAvatarInitial } from "@/shared/utils/getAvatarInitial";
import type { IDeposit } from "../types/deposit.types";

export const useDepositMemberSummaryColumns = (): TableColumn<IDeposit>[] => {
  const { can } = useRBAC();

  const columns: TableColumn<IDeposit>[] = [
    {
      key: "member",
      title: "Member",
      render: (deposit) => {
        return (
          <div className="flex items-center gap-3">
            <Avatar
              size="sm"
              fallback={getAvatarInitial(
                deposit?.member?.name ?? "",
                deposit?.member?.avatar,
              )}
            />

            <span className="font-medium">{deposit?.member?.name ?? ""}</span>
          </div>
        );
      },
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

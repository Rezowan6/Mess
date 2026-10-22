import { ActionLink } from "@/shared/components/ui/ActionLink";
import { Badge } from "@/shared/components/ui/Badge";
import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import type { TableColumn } from "@/shared/components/ui/Table";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { formatTaka } from "@/shared/utils/format.utils";

import type { ICurrentBill } from "../types/currentBill.types";

export const useCurrentBillsColumns = (): TableColumn<ICurrentBill>[] => {
  const { can } = useRBAC();

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
      title: "Amount",
      render: (currentBill) => formatTaka(currentBill.amount),
    },
    {
      key: "status",
      title: "Status",
      render: (currentBill) => (
        <Badge size="sm" variant="soft-success">
          {currentBill.status.replace("_", " ")}
        </Badge>
      ),
    },
  ];

  if (can(PERMISSIONS.CURRENT_BILL_VIEW)) {
    columns.push({
      key: "actions",
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

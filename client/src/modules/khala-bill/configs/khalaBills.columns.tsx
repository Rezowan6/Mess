import { ActionLink } from "@/shared/components/ui/ActionLink";
import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import type { TableColumn } from "@/shared/components/ui/Table";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import { useRBAC } from "@/shared/hooks/useRBAC";

import { Badge } from "@/shared/components/ui/Badge";
import { formatTaka } from "@/shared/utils/format.utils";
import type { IKhalaBill } from "../types/khalaBill.types";

export const useKhalaBillsColumns = (): TableColumn<IKhalaBill>[] => {
  const { can } = useRBAC();

  const columns: TableColumn<IKhalaBill>[] = [
    {
      key: "member",
      title: "Member",
      render: (bill) => (
        <MemberAvatar name={bill.member?.name} avatar={bill.member?.avatar} />
      ),
    },
    {
      key: "amount",
      title: "Amount",
      render: (bill) => formatTaka(bill.amount),
    },
    {
      key: "status",
      title: "Status",
      render: (bill) => (
        <>
          <Badge size="sm" variant="soft-success">
            {bill.status.replace("_", " ")}
          </Badge>
        </>
      ),
    },
  ];

  if (can(PERMISSIONS.KHALA_BILL_VIEW)) {
    columns.push({
      key: "actions",
      title: "Actions",
      render: (bill) => (
        <ActionLink
          state={bill}
          to={`${ROUTES.KHALA_BILL}/history/${bill.userId}`}
        >
          Details
        </ActionLink>
      ),
    });
  }

  return columns;
};

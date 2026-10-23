import { ActionLink } from "@/shared/components/ui/ActionLink";
import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import type { TableColumn } from "@/shared/components/ui/Table";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";

import { Badge } from "@/shared/components/ui/Badge";
import { formatTaka } from "@/shared/utils/format.utils";
import type { IKhalaBill } from "../types/khalaBill.types";

export const useKhalaBillsColumns = (): TableColumn<IKhalaBill>[] => {
  const columns: TableColumn<IKhalaBill>[] = [
    {
      key: "member",
      title: "Member",
      render: (bill) => (
        <ActionLink
          to={`${ROUTES.KHALA_BILL}/history/${bill.userId}`}
          state={bill}
          permission={PERMISSIONS.KHALA_BILL_CREATE}
          onDenied="plain"
          showIcon={false}
          showHoverBorder={false}
        >
          <MemberAvatar name={bill.member?.name} avatar={bill.member?.avatar} />
        </ActionLink>
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

  return columns;
};

import { Badge } from "@/shared/components/ui/Badge";
import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import type { TableColumn } from "@/shared/components/ui/Table";
import { formatMonthName } from "@/shared/utils/date.utils";
import { formatTaka } from "@/shared/utils/format.utils";
import { formatDateTime } from "@/shared/utils/time";

import { DeletedCurrentBillAction } from "../components/DeletedCurrentBillAction";
import type { ICurrentBill } from "../types/currentBill.types";

export const useDeletedCurrentBillsColumns =
  (): TableColumn<ICurrentBill>[] => {
    return [
      {
        key: "member",
        title: "Member",
        render: (currentBill) => (
          <MemberAvatar
            name={currentBill.member?.name ?? `Member #${currentBill.userId}`}
            avatar={currentBill.member?.avatar}
          />
        ),
      },
      {
        key: "amount",
        title: "Amount",
        render: (currentBill) => formatTaka(Number(currentBill.amount)),
      },
      {
        key: "period",
        title: "Billing Month",
        render: (currentBill) =>
          `${formatMonthName(currentBill.month)} ${currentBill.year}`,
      },
      {
        key: "status",
        title: "Status",
        render: (currentBill) => (
          // Neutral colour on purpose: these bills are deleted
          <Badge size="sm" variant="soft-secondary">
            {currentBill.status.replaceAll("_", " ")}
          </Badge>
        ),
      },
      {
        key: "deletedAt",
        title: "Deleted At",
        render: (currentBill) =>
          currentBill.deletedAt ? formatDateTime(currentBill.deletedAt) : "—",
      },
      {
        key: "actions",
        title: "Actions",
        render: (currentBill) => (
          <DeletedCurrentBillAction currentBill={currentBill} />
        ),
      },
    ];
  };

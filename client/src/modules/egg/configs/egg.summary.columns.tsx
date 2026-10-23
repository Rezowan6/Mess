import type { TableColumn } from "@/shared/components/ui/Table";

import { ActionLink } from "@/shared/components/ui/ActionLink";
import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import type { IEgg } from "../types/egg.types";
import { formatPcs } from "@/shared/utils/format.utils";

export const useEggSummaryColumns = (): TableColumn<IEgg>[] => {
  const columns: TableColumn<IEgg>[] = [
    {
      key: "member",
      title: "Member",
      render: (egg) => (
        <ActionLink
          to={`${ROUTES.EXPENSE}/egg/history/${egg.memberId}`}
          state={egg}
          permission={PERMISSIONS.EXPENSE_CREATE}
          onDenied="plain"
          showIcon={false}
          showHoverBorder={false}
        >
          <MemberAvatar name={egg.member?.name} avatar={egg.member?.avatar} />
        </ActionLink>
      ),
    },
    {
      key: "quantity",
      title: "Total Eggs",
      render: (egg) => formatPcs(egg.quantity),
    },
  ];

  return columns;
};

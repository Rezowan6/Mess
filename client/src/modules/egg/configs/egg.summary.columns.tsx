import type { TableColumn } from "@/shared/components/ui/Table";

import { ActionLink } from "@/shared/components/ui/ActionLink";
import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import { ROUTES } from "@/shared/constants/routes";
import type { IEgg } from "../types/egg.types";
import { useEggTablePermissions } from "./egg.columns.permission";

export const useEggSummaryColumns = (): TableColumn<IEgg>[] => {
  const { canViewDetails } = useEggTablePermissions();
  const columns: TableColumn<IEgg>[] = [
    {
      key: "member",
      title: "Member",
      render: (egg) => (
        <MemberAvatar name={egg.member?.name} avatar={egg.member?.avatar} />
      ),
    },
    {
      key: "quantity",
      title: "Total Eggs",
      render: (egg) => egg.quantity,
    },
  ];

  if (canViewDetails) {
    columns.push({
      key: "details",
      title: "Details",
      render: (egg) => (
        <ActionLink to={`${ROUTES.EXPENSE}/egg/history/${egg.memberId}`}>
          Details
        </ActionLink>
      ),
    });
  }

  return columns;
};

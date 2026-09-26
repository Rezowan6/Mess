import type { TableColumn } from "@/shared/components/ui/Table";

import { ActionLink } from "@/shared/components/ui/ActionLink";
import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import type { IEgg } from "../types/egg.types";
import { ROUTES } from "@/shared/constants/routes";

export const useEggSummaryColumns = (): TableColumn<IEgg>[] => {
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
    {
      key: "details",
      title: "Details",
      render: (egg) => (
        <ActionLink state={egg} to={`${ROUTES.EXPENSE}/egg/history`}>
          Details
        </ActionLink>
      ),
    },
  ];

  return columns;
};

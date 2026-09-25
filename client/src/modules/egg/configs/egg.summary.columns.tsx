import type { TableColumn } from "@/shared/components/ui/Table";

import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import type { IEgg } from "../types/egg.types";

export const useEggSummaryColumns = (onEdit: (egg: IEgg) => void,): TableColumn<IEgg>[] => {
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

  return columns;
};

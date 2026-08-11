import { Avatar } from "@/shared/components/ui/Avatar";
import type { TableColumn } from "@/shared/components/ui/Table";

import { Button } from "@/shared/components/ui/Button";
import type { IMealPlanningMember } from "../types/mealPlanning.types";
import { getAvatarInitial } from "@/shared/utils/getAvatarInitial";

export const mealPlanningColumns: TableColumn<IMealPlanningMember>[] = [
  {
    key: "member",
    title: "Member",
    render: (row) => (
      <div className="flex items-center gap-3">
        <Avatar size="sm" fallback={getAvatarInitial(row.memberName)} />

        <span className="font-medium">{row.memberName}</span>
      </div>
    ),
  },

  {
    key: "meal",
    title: "Meal",
    render: (row) => <span className="font-semibold">{row.meal}</span>,
  },

  {
    key: "actions",
    title: "Actions",
    className: "w-32",
    render: () => (
      <div className="flex items-center gap-2">
        <Button disabled variant="success">Approve</Button>

        <Button disabled variant="error">Reject</Button>
      </div>
    ),
  },
];

import type { TableColumn } from "@/shared/components/ui/Table";

import { Button } from "@/shared/components/ui/Button";
import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import type { IMealPlanningMember } from "../types/mealPlanning.types";

export const getMealPlanningColumns = (
  onReject: (userId: number) => void,
  isPending: boolean,
  pendingUserId: number | null,
): TableColumn<IMealPlanningMember>[] => [
  {
    key: "member",
    title: "Member",
    render: (row) => {
      return <MemberAvatar avatar={row.avatar} name={row?.memberName} />;
    },
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
    render: (row) => (
      <div className="flex items-center gap-2">
        <Button disabled variant="success">
          Approve
        </Button>

        <Button
          variant="error"
          onClick={() => onReject(row.userId)}
          disabled={isPending && pendingUserId === row.userId}
          loading={isPending && pendingUserId === row.userId}
          loadingText="Rejecting..."
        >
          Reject
        </Button>
      </div>
    ),
  },
];

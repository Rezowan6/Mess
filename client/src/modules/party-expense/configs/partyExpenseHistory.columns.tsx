import { Avatar } from "@/shared/components/ui/Avatar";
import { getAvatarInitial } from "@/shared/utils/getAvatarInitial";
import type { IPartyExpense } from "../types/partyExpense.types";

export const partyExpenseHistoryColumns = () => {
  const columns = [
    {
      key: "member",
      title: "Member",
      render: (item: IPartyExpense["members"][number]) => (
        <div className="flex items-center gap-3">
          <Avatar size="sm" fallback={getAvatarInitial(item.member.name)} />

          <span className="font-medium">{item.member.name}</span>
        </div>
      ),
    },
    {
      key: "email",
      title: "Email",
      render: (item: IPartyExpense["members"][number]) => item.member.email,
    },
    {
      key: "amount",
      title: "Share Amount",
      render: (item: IPartyExpense["members"][number]) => item.amount,
    },
  ];

  return columns;
};

import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import type { IPartyExpense } from "../types/partyExpense.types";

export const partyExpenseHistoryColumns = () => {
  const columns = [
    {
      key: "member",
      title: "Member",
      render: (item: IPartyExpense["members"][number]) => (
        <MemberAvatar avatar={item.member.avatar} name={item.member.name} />
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

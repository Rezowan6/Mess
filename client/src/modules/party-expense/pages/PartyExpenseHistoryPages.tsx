import { useLocation } from "react-router-dom";

import { Table } from "@/shared/components/ui/Table";

import type { IPartyExpense } from "../types/partyExpense.types";

export const PartyExpenseHistoryPage = () => {
  const location = useLocation();

  const partyExpense = location.state as IPartyExpense;

  const columns = [
    {
      key: "member",
      title: "Member",
      render: (item: IPartyExpense["members"][number]) => item.member.name,
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

  return (
    <Table
      columns={columns}
      data={partyExpense?.members ?? []}
      loading={false}
      error={false}
    />
  );
};

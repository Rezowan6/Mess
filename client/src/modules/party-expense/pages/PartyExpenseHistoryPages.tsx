import { useLocation } from "react-router-dom";

import { Table } from "@/shared/components/ui/Table";

import { partyExpenseHistoryColumns } from "../configs/partyExpenseHistory.columns";
import type { IPartyExpense } from "../types/partyExpense.types";

export const PartyExpenseHistoryPage = () => {
  const location = useLocation();

  const columns = partyExpenseHistoryColumns();

  const partyExpense = location.state as IPartyExpense;

  return (
    <Table
      columns={columns}
      data={partyExpense?.members ?? []}
      loading={false}
      error={false}
    />
  );
};

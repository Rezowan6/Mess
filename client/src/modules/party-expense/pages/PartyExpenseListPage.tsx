// File: PartyExpenseListPage.tsx

import { PartyExpenseTable } from "../components/PartyExpenseTable";
import { usePartyExpenses } from "../hooks/usePartyExpenses";

export const PartyExpenseListPage = () => {
  const { data, isPending, isError, refetch } = usePartyExpenses();

  const partyExpenses = data?.data ?? [];

  return (
    <PartyExpenseTable
      data={partyExpenses}
      loading={isPending}
      error={isError}
      refetch={refetch}
    />
  );
};

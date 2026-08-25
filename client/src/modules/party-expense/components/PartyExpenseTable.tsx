// File: PartyExpenseTable.tsx

import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";

import { usePartyExpenseColumns } from "../configs/partyExpense.columns";
import { PARTY_EXPENSE_MESSAGES } from "../configs/partyExpense.messages";
import { PartyExpenseTableSkeleton } from "./PartyExpenseTableSkeleton";

import { usePartyExpenseTable } from "../hooks/usePartyExpenseTable";
import { AddPartyExpenseModal } from "./AddPartyExpenseModal";

export const PartyExpenseTable = () => {
  const {
    partyExpenses,
    isPending,
    isError,
    refetch,
    search,
    selectedPartyExpense,
    isEditOpen,
    handleSearch,
    handleEdit,
    handleCloseEdit,
  } = usePartyExpenseTable();

  const columns = usePartyExpenseColumns(handleEdit);

  if (isPending) {
    return <PartyExpenseTableSkeleton />;
  }

  return (
    <div className="space-y-4">
      <SearchInput value={search} onChange={handleSearch} placeholder="description" />

      <Table
        columns={columns}
        data={partyExpenses}
        loading={isPending}
        error={isError}
        message={PARTY_EXPENSE_MESSAGES}
        refetch={refetch}
      />

      <AddPartyExpenseModal
        isOpen={isEditOpen}
        onClose={handleCloseEdit}
        partyExpense={selectedPartyExpense ?? undefined}
      />
    </div>
  );
};

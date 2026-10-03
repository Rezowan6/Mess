import { DataTableSection } from "@/shared/components/ui/DataTableSection";

import { usePartyExpenseColumns } from "../../configs/partyExpense.columns";
import { PARTY_EXPENSE_MESSAGES } from "../../configs/partyExpense.messages";
import { usePartyExpenseTable } from "../../hooks/usePartyExpenseTable";
import { AddPartyExpenseModal } from "../modla/AddPartyExpenseModal";
import { PartyExpenseTableSkeleton } from "../skeleton/PartyExpenseTableSkeleton";

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

  // future server side pagination, for now we are fetching all the data and calculating total expense
  const totalPartyExpense =
    partyExpenses.reduce((sum, item) => sum + Number(item.amount), 0) ?? 0;

  return (
    <DataTableSection
      columns={columns}
      data={partyExpenses}
      isPending={isPending}
      isError={isError}
      refetch={refetch}
      skeleton={<PartyExpenseTableSkeleton />}
      message={PARTY_EXPENSE_MESSAGES}
      search={search}
      onSearch={handleSearch}
      searchPlaceholder="description"
      summary={{
        label: "Total Expense",
        amount: Number(totalPartyExpense),
        prefix: "৳ ",
        className: "text-error",
      }}
    >
      <AddPartyExpenseModal
        isOpen={isEditOpen}
        onClose={handleCloseEdit}
        partyExpense={selectedPartyExpense ?? undefined}
      />
    </DataTableSection>
  );
};

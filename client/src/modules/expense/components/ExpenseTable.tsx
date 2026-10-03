import { useState } from "react";

import { DataTableSection } from "@/shared/components/ui/DataTableSection";
import { useTableSearchParams } from "@/shared/hooks/useTableSearchParams";

import { useExpenseColumns } from "../configs/expense.columns";
import { EXPENSE_MESSAGES } from "../configs/expense.messages";
import { useExpenses } from "../hooks/useExpenses";
import type { IExpense } from "../types/expense.types";
import { AddExpenseModal } from "./AddExpenseModal";
import { ExpenseTableSkeleton } from "./ExpenseTableSkeleton";

const PAGE_LIMIT = 10;

export const ExpenseTable = () => {
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { page, search, handleSearch, handlePage } = useTableSearchParams();

  const { data, isPending, isError, refetch } = useExpenses({
    page,
    limit: PAGE_LIMIT,
    search,
  });

  const handleEdit = (expense: IExpense) => {
    setSelectedExpense(expense);
    setIsEditOpen(true);
  };

  const totalExpense =
    data?.data?.reduce((sum, item) => sum + Number(item.amount), 0) ?? 0;

  const columns = useExpenseColumns(handleEdit);

  return (
    <DataTableSection
      columns={columns}
      data={data?.data ?? []}
      meta={data?.meta}
      isPending={isPending}
      isError={isError}
      refetch={refetch}
      skeleton={<ExpenseTableSkeleton />}
      message={EXPENSE_MESSAGES}
      search={search}
      onSearch={handleSearch}
      onPageChange={handlePage}
      summary={{
        label: "Total Expense",
        amount: Number(totalExpense),
        prefix: "৳ ",
        className: "text-error",
      }}
    >
      <AddExpenseModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedExpense(null);
        }}
        expense={selectedExpense ?? undefined}
      />
    </DataTableSection>
  );
};

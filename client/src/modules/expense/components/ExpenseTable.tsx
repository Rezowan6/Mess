import { useState } from "react";

import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";

import { useExpenseColumns } from "../configs/expense.columns";
import { EXPENSE_MESSAGES } from "../configs/expense.messages";

import { useExpenses } from "../hooks/useExpenses";

import { useTableSearchParams } from "@/shared/hooks/useTableSearchParams";
import type { IExpense } from "../types/expense.types";
import { AddExpenseModal } from "./AddExpenseModal";
import { ExpenseTableSkeleton } from "./ExpenseTableSkeleton";

export const ExpenseTable = () => {
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const { page, search, handleSearch, handlePage } = useTableSearchParams();

  const { data, isPending, isError, refetch } = useExpenses({
    page,

    limit: 10,

    search,
  });
  const expenses = data?.data ?? [];

  const meta = data?.meta;

  const handleEdit = (expense: IExpense) => {
    setSelectedExpense(expense);
    setIsEditOpen(true);
  };
  const columns = useExpenseColumns(handleEdit);

  if (isPending) {
    return <ExpenseTableSkeleton />;
  }

  return (
    <div className="space-y-4">
      <SearchInput value={search} onChange={handleSearch} />

      <Table
        columns={columns}
        data={expenses}
        loading={isPending}
        error={isError}
        message={EXPENSE_MESSAGES}
        refetch={refetch}
      />

      {meta && (
        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          onChange={handlePage}
        />
      )}

      <AddExpenseModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedExpense(null);
        }}
        expense={selectedExpense ?? undefined}
      />
    </div>
  );
};

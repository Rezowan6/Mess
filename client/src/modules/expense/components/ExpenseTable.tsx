import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";

import { useExpenseColumns } from "../configs/expense.columns";
import { EXPENSE_MESSAGES } from "../configs/expense.messages";

import { useExpenses } from "../hooks/useExpenses";

import type { IExpense } from "../types/expense.types";
import { AddExpenseModal } from "./AddExpenseModal";
import { ExpenseTableSkeleton } from "./ExpenseTableSkeleton";

export const ExpenseTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  /**
   * URL Query Params
   */

  const page = Number(searchParams.get("page")) || 1;

  const search = searchParams.get("search") || "";

  /**
   * Expense Query
   */

  const { data, isPending, isError, refetch } = useExpenses({
    page,

    limit: 10,

    search,
  });
  const expenses = data?.data ?? [];

  const meta = data?.meta;

  /**
   * Search Handler
   */

  const handleSearch = (value: string) => {
    setSearchParams(
      {
        page: "1",

        ...(value && {
          search: value,
        }),
      },
      {
        replace: true,
      },
    );
  };

  /**
   * Pagination
   */

  const handlePage = (page: number) => {
    setSearchParams({
      page: String(page),

      ...(search && {
        search,
      }),
    });
  };

  /**
   * Reset page when tenant changes
   */

  useEffect(() => {
    if (page !== 1) {
      setSearchParams(
        {
          page: "1",

          ...(search && {
            search,
          }),
        },
        {
          replace: true,
        },
      );
    }
  }, []);

  /**
   * handle edit
   */
  const handleEdit = (expense: IExpense) => {
    setSelectedExpense(expense);
    setIsEditOpen(true);
  };
  const columns = useExpenseColumns(handleEdit);

  /**
   * First Loading
   */

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

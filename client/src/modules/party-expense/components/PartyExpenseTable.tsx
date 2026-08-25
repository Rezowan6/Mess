// File: PartyExpenseTable.tsx

import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";

import { usePartyExpenseColumns } from "../configs/partyExpense.columns";
import { PARTY_EXPENSE_MESSAGES } from "../configs/partyExpense.messages";
import { PartyExpenseTableSkeleton } from "./PartyExpenseTableSkeleton";

import { usePartyExpenses } from "../hooks/usePartyExpenses";
import type { IPartyExpense } from "../types/partyExpense.types";
import { AddPartyExpenseModal } from "./AddPartyExpenseModal";

export const PartyExpenseTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedPartyExpense, setSelectedPartyExpense] =
    useState<IPartyExpense | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const { data, isPending, isError, refetch } = usePartyExpenses({
    page,

    limit: 10,

    search,
  });

  const partyExpenses = data?.data ?? [];

  const handleSearch = (value: string) => {
    setSearchParams(
      {
        page: "1",
        ...(value && { search: value }),
      },
      { replace: true },
    );
  };

  // const handlePage = (page: number) => {
  //   setSearchParams({
  //     page: String(page),
  //     ...(search && { search }),
  //   });
  // };

  // useEffect(() => {
  //   if (page !== 1) {
  //     setSearchParams(
  //       {
  //         page: "1",
  //         ...(search && { search }),
  //       },
  //       { replace: true },
  //     );
  //   }
  // }, []);

  /**
   * handle edit
   */
  const handleEdit = (expense: IPartyExpense) => {
    setSelectedPartyExpense(expense);
    setIsEditOpen(true);
  };

  const columns = usePartyExpenseColumns(handleEdit);

  if (isPending) {
    return <PartyExpenseTableSkeleton />;
  }

  return (
    <div className="space-y-4">
      <SearchInput value={search} onChange={handleSearch} />

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
        onClose={() => {
          setIsEditOpen(false);
          setSelectedPartyExpense(null);
        }}
        partyExpense={selectedPartyExpense ?? undefined}
      />
    </div>
  );
};

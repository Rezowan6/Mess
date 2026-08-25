// File: PartyExpenseTable.tsx

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";

import { usePartyExpenseColumns } from "../configs/partyExpense.columns";
import { PARTY_EXPENSE_MESSAGES } from "../configs/partyExpense.messages";
import { PartyExpenseTableSkeleton } from "./PartyExpenseTableSkeleton";

import type { IPartyExpense } from "../types/partyExpense.types";
import { AddPartyExpenseModal } from "./AddPartyExpenseModal";

interface Props {
  data: IPartyExpense[];
  loading: boolean;
  error: boolean;
  refetch: () => void;
}

export const PartyExpenseTable = ({ data, loading, error, refetch }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedPartyExpense, setSelectedPartyExpense] =
    useState<IPartyExpense | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

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

  useEffect(() => {
    if (page !== 1) {
      setSearchParams(
        {
          page: "1",
          ...(search && { search }),
        },
        { replace: true },
      );
    }
  }, []);

  /**
   * handle edit
   */
  const handleEdit = (expense: IPartyExpense) => {
    setSelectedPartyExpense(expense);
    setIsEditOpen(true);
  };

  const columns = usePartyExpenseColumns(handleEdit);

  if (loading) {
    return <PartyExpenseTableSkeleton />;
  }

  return (
    <div className="space-y-4">
      <SearchInput value={search} onChange={handleSearch} />

      <Table
        columns={columns}
        data={data}
        loading={loading}
        error={error}
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

import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { usePartyExpenses } from "./usePartyExpenses";

import type { IPartyExpense } from "../types/partyExpense.types";

export const usePartyExpenseTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedPartyExpense, setSelectedPartyExpense] =
    useState<IPartyExpense | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const partyExpenseQuery = usePartyExpenses({
    page,
    limit: 10,
    search,
  });

  const partyExpenses = partyExpenseQuery.data?.data ?? [];

  const handleSearch = (value: string) => {
    setSearchParams(
      {
        page: "1",
        ...(value && { search: value }),
      },
      { replace: true },
    );
  };

  const handleEdit = (partyExpense: IPartyExpense) => {
    setSelectedPartyExpense(partyExpense);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setSelectedPartyExpense(null);
  };

  return {
    ...partyExpenseQuery,
    partyExpenses,
    page,
    search,
    selectedPartyExpense,
    isEditOpen,
    handleSearch,
    handleEdit,
    handleCloseEdit,
  };
};

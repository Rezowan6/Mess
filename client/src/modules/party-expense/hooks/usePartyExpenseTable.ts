import { useState } from "react";

import { usePartyExpenses } from "./usePartyExpenses";

import { useTableSearchParams } from "@/shared/hooks/useTableSearchParams";
import type { IPartyExpense } from "../types/partyExpense.types";

export const usePartyExpenseTable = () => {
  const { page, search, handleSearch } = useTableSearchParams();

  const [selectedPartyExpense, setSelectedPartyExpense] =
    useState<IPartyExpense | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const partyExpenseQuery = usePartyExpenses({
    page,
    limit: 10,
    search,
  });

  const partyExpenses = partyExpenseQuery.data?.data ?? [];

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

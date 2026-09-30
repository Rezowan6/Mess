import { useState } from "react";

import { useTableSearchParams } from "@/shared/hooks/useTableSearchParams";

import type { IRice } from "../types/rice.types";

import { useRice } from "./useRice";

export const useRiceSummaryTable = () => {
  const { page, search, handleSearch, handlePage } = useTableSearchParams();

  const [selectedRice, setSelectedRice] = useState<IRice | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const riceQuery = useRice();

  const rice = riceQuery.data?.data ?? [];

  const meta = riceQuery.data?.meta;

  const handleEdit = (rice: IRice) => {
    setSelectedRice(rice);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setSelectedRice(null);
  };

  return {
    ...riceQuery,
    rice,
    meta,
    page,
    search,
    selectedRice,
    isEditOpen,
    handleSearch,
    handlePage,
    handleEdit,
    handleCloseEdit,
  };
};

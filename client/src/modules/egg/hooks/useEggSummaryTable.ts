import { useState } from "react";

import { useTableSearchParams } from "@/shared/hooks/useTableSearchParams";
import { useEggs } from "./useEggs";

import type { IEgg } from "../types/egg.types";

export const useEggSummaryTable = () => {
  const { page, search, handleSearch, handlePage } = useTableSearchParams();

  const [selectedEgg, setSelectedEgg] = useState<IEgg | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const eggQuery = useEggs();

  const eggs = eggQuery.data?.data ?? [];
  const meta = eggQuery.data?.meta;

  const handleEdit = (egg: IEgg) => {
    setSelectedEgg(egg);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setSelectedEgg(null);
  };

  return {
    ...eggQuery,
    eggs,
    meta,
    page,
    search,
    selectedEgg,
    isEditOpen,
    handleSearch,
    handlePage,
    handleEdit,
    handleCloseEdit,
  };
};

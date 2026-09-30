import { useState } from "react";

import { useTableSearchParams } from "@/shared/hooks/useTableSearchParams";

import type { IRice } from "../types/rice.types";

import { useRice } from "./useRice";

export const useRiceSummaryTable = () => {
  const { search, handleSearch, handlePage } = useTableSearchParams();

  const [payingRice, setPayingRice] = useState<IRice | null>(null);
  // page import of usetablesearcparams
  // {
  //   page,
  //   limit: 10,
  //   search,
  // }

  const { data, isPending, isError, refetch } = useRice();

  const rice = data?.data ?? [];

  return {
    rice,
    meta: data?.meta,
    isPending,
    isError,
    refetch,

    search,
    handleSearch,
    handlePage,

    payingRice,
    openPayModal: (rice: IRice) => setPayingRice(rice),
    closePayModal: () => setPayingRice(null),
  };
};

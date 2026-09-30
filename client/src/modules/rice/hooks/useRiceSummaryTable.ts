import { useState } from "react";

import { useTableSearchParams } from "@/shared/hooks/useTableSearchParams";

import type { IRice } from "../types/rice.types";

import { useRice } from "./useRice";

export const useRiceSummaryTable = () => {
  const { search, handleSearch, handlePage } = useTableSearchParams();

  const [payingRice, setPayingRice] = useState<IRice | null>(null);
  const [detailsRiceId, setDetailsRiceId] = useState<number | null>(null);
  // page import of usetablesearcparams
  // {
  //   page,
  //   limit: 10,
  //   search,
  // }

  const { data, isPending, isError, refetch } = useRice();

  const rice = data?.data ?? [];

  // Store only the id, then read the live row from the list query.
  // This way the modal always shows fresh totalPaid / remainingDue after a payment.
  const detailsRice = rice.find((item) => item.id === detailsRiceId) ?? null;

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

    detailsRice,
    openDetails: (item: IRice) => setDetailsRiceId(item.id),
    closeDetails: () => setDetailsRiceId(null),
  };
};

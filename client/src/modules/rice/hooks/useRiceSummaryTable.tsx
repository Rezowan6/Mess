import { useMemo, useState } from "react";

import { useTableSearchParams } from "@/shared/hooks/useTableSearchParams";

import type { IRice } from "../types/rice.types";

import { useConfirmStore } from "@/shared/store/confirm.store";
import { useDeleteRice } from "./useDeleteRice";
import { useRice } from "./useRice";

export const useRiceSummaryTable = () => {
  const { search, handleSearch, handlePage } = useTableSearchParams();

  const [payingRice, setPayingRice] = useState<IRice | null>(null);
  const [editingRice, setEditingRice] = useState<IRice | null>(null);
  const [isPayAllOpen, setIsPayAllOpen] = useState(false);

  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);
  // page import of usetablesearcparams
  // {
  //   page,
  //   limit: 10,
  //   search,
  // }
  const { mutateAsync: deleteRice } = useDeleteRice();

  const { data, isPending, isError, refetch } = useRice();

  const rice = data?.data ?? [];

  const openPayModal = (rice: IRice) => {
    setPayingRice(rice);
  };

  const closePayModal = () => {
    setPayingRice(null);
  };

  const openEditModal = (rice: IRice) => {
    setEditingRice(rice);
  };

  const closeEditModal = () => {
    setEditingRice(null);
  };

  const handleDelete = (rice: IRice) => {
    openConfirm({
      title: "Delete Rice Purchase",
      message: (
        <>
          Are you sure you want to delete this rice purchase from{" "}
          <strong>{rice.supplierName || "this supplier"}</strong>?
          <br />
          This action cannot be undone.
        </>
      ),
      onConfirm: async () => {
        try {
          setLoading(true);

          await deleteRice(rice.id);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const dueSummary = useMemo(() => {
    const dueItems = rice.filter((item) => Number(item.remainingDue) > 0);
    return {
      dueCount: dueItems.length,
      totalDue: Number(
        dueItems
          .reduce((sum, item) => sum + Number(item.remainingDue), 0)
          .toFixed(2),
      ),
    };
  }, [rice]);

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
    openPayModal,
    closePayModal,

    editingRice,
    openEditModal,
    closeEditModal,

    handleDelete,

    isPayAllOpen,
    openPayAll: () => setIsPayAllOpen(true),
    closePayAll: () => setIsPayAllOpen(false),
    dueSummary,
  };
};

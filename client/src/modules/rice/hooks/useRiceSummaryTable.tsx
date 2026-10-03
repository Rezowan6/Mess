import { useState } from "react";

import { useTableSearchParams } from "@/shared/hooks/useTableSearchParams";

import type { IRice } from "../types/rice.types";

import { useConfirmStore } from "@/shared/store/confirm.store";
import { useDeleteRice } from "./useDeleteRice";
import { useRice } from "./useRice";

const PAGE_LIMIT = 10;
const EMPTY_RICE: IRice[] = [];
const EMPTY_DUE_SUMMARY = {
  dueCount: 0,
  totalDue: 0,
  totalAmount: 0,
  totalPaid: 0,
};

export const useRiceSummaryTable = () => {
  const { page, search, handleSearch, handlePage } = useTableSearchParams();

  const [payingRice, setPayingRice] = useState<IRice | null>(null);
  const [editingRice, setEditingRice] = useState<IRice | null>(null);
  const [isPayAllOpen, setIsPayAllOpen] = useState(false);

  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  const { mutateAsync: deleteRice } = useDeleteRice();

  const { data, isPending, isError, refetch } = useRice({
    page,
    limit: PAGE_LIMIT,
    search,
  });

  const rice: IRice[] = data?.data ?? EMPTY_RICE;

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

  const handleDelete = (item: IRice) => {
    openConfirm({
      title: "Delete Rice Purchase",
      message: (
        <>
          Are you sure you want to delete this rice purchase from{" "}
          <strong>{item.supplierName || "this supplier"}</strong>?
          <br />
          This action cannot be undone.
        </>
      ),
      onConfirm: async () => {
        try {
          setLoading(true);

          await deleteRice(item.id);

          // Last row of a later page was removed: go back one page
          if (rice.length === 1 && page > 1) {
            handlePage(page - 1);
          }
        } finally {
          setLoading(false);
        }
      },
    });
  };

  // Total of ALL due purchases, calculated by the backend
  const dueSummary = data?.dueSummary ?? EMPTY_DUE_SUMMARY;

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

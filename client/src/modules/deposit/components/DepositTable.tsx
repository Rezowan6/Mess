import { useState } from "react";

import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";

import { DEPOSIT_MESSAGES } from "../configs/deposit.messages";

import type { IDeposit } from "../types/deposit.types";

import { useTableSearchParams } from "@/shared/hooks/useTableSearchParams";
import { useDepositMemberSummaryColumns } from "../configs/deposit.member.summary.columns";
import { useMemberDepositSummary } from "../hooks/useMemberDepositSummary";
import { AddDepositModal } from "./AddDepositModal";
import { DepositTableSkeleton } from "./DepositTableSkeleton";

export const DepositTable = () => {
  const { page, search, handleSearch, handlePage } = useTableSearchParams();

  const [selectedDeposit, setSelectedDeposit] = useState<IDeposit | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data, isPending, isError, refetch } = useMemberDepositSummary({
    page,

    limit: 10,

    search,
  });

  const deposits = data?.data ?? [];

  const meta = data?.meta;

  const columns = useDepositMemberSummaryColumns();

  if (isPending) {
    return <DepositTableSkeleton />;
  }

  return (
    <div className="space-y-4">
      <SearchInput value={search} onChange={handleSearch} />

      <Table
        columns={columns}
        data={deposits}
        loading={isPending}
        error={isError}
        message={DEPOSIT_MESSAGES}
        refetch={refetch}
      />

      {meta && (
        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          onChange={handlePage}
        />
      )}

      <AddDepositModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedDeposit(null);
        }}
        deposit={selectedDeposit ?? undefined}
      />
    </div>
  );
};

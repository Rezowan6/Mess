import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";

import { DEPOSIT_MESSAGES } from "../configs/deposit.messages";

import type { IDeposit } from "../types/deposit.types";

import { useDepositMemberSummaryColumns } from "../configs/deposit.member.summary.columns";
import { useMemberDepositSummary } from "../hooks/useMemberDepositSummary";
import { AddDepositModal } from "./AddDepositModal";
import { DepositTableSkeleton } from "./DepositTableSkeleton";

export const DepositTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedDeposit, setSelectedDeposit] = useState<IDeposit | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  /**
   * URL Query Params
   */

  const page = Number(searchParams.get("page")) || 1;

  const search = searchParams.get("search") || "";

  /**
   * Deposit Query
   */

  const { data, isPending, isError, refetch } = useMemberDepositSummary({
    page,

    limit: 10,

    search,
  });

  const deposits = data?.data ?? [];

  const meta = data?.meta;

  /**
   * Search Handler
   */

  const handleSearch = (value: string) => {
    setSearchParams(
      {
        page: "1",

        ...(value && {
          search: value,
        }),
      },
      {
        replace: true,
      },
    );
  };

  /**
   * Pagination
   */

  const handlePage = (page: number) => {
    setSearchParams({
      page: String(page),

      ...(search && {
        search,
      }),
    });
  };

  /**
   * Reset page when tenant changes
   */

  useEffect(() => {
    if (page !== 1) {
      setSearchParams(
        {
          page: "1",

          ...(search && {
            search,
          }),
        },
        {
          replace: true,
        },
      );
    }
  }, []);

  /**
   * Handle Edit
   */

  // const handleEdit = (deposit: IDeposit) => {
  //   setSelectedDeposit(deposit);

  //   setIsEditOpen(true);
  // };

  const columns = useDepositMemberSummaryColumns();

  /**
   * First Loading
   */

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

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";

import { DepositTableSkeleton } from "../components/DepositTableSkeleton";
import { useDepositAddColumns } from "../configs/deposit.add.columns";
import { DEPOSIT_MESSAGES } from "../configs/deposit.messages";

import { useMembers } from "@/modules/user-management/hooks/useMembers";
import type { ITenantMember } from "@/modules/user-management/types/userManagement.types";

import { ROUTES } from "@/shared/constants/routes";
import { useConfirmStore } from "@/shared/store/confirm.store";
import { useCreateDeposit } from "../hooks/useCreateDeposit";

export const DepositAddPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  const quickDepositMutation = useCreateDeposit();

  /**
   * URL Params
   */
  const page = Number(searchParams.get("page")) || 1;

  const search = searchParams.get("search") || "";

  /**
   * Members Query
   */
  const { data, isPending, isError, refetch } = useMembers({
    page,
    limit: 10,
    search,
  });

  const members = data?.data ?? [];

  const meta = data?.meta;

  /**
   * Search
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
   * Reset page
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
   * Quick Deposit
   */
  const handleQuickDeposit = async (member: ITenantMember, amount: number) => {
    openConfirm({
      title: "Add Deposit",
      message: (
        <>
          Are you sure you want to add{" "}
          <strong className="text-success">{amount}</strong> to{" "}
          <strong className="text-success">{member.user.name}</strong>
          's deposit?
        </>
      ),

      onConfirm: async () => {
        try {
          setLoading(true);

          await quickDepositMutation.mutateAsync({
            memberId: member.user.id,
            amount,
            paymentMethod: "Cash",
            note: "Quick Deposit",
          });

          setTimeout(() => {
            navigate(ROUTES.DEPOSIT);
          }, 500);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const columns = useDepositAddColumns();

  if (isPending) {
    return <DepositTableSkeleton />;
  }

  return (
    <>
      <SearchInput value={search} onChange={handleSearch} />

      <Table
        columns={columns}
        data={members}
        actions={{
          onAddDeposit: handleQuickDeposit,
        }}
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
    </>
  );
};

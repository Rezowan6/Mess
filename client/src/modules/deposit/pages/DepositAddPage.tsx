import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";

import { DepositTableSkeleton } from "../components/DepositTableSkeleton";
import { useDepositAddColumns } from "../configs/deposit.add.columns";
import { DEPOSIT_MESSAGES } from "../configs/deposit.messages";

import { useMembers } from "@/modules/user-management/hooks/useMembers";
import type { ITenantMember } from "@/modules/user-management/types/userManagement.types";

import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { ErrorState } from "@/shared/components/feedback/ErrorState";
import { RecordDeleteMessage } from "@/shared/data-display/RecordDeleteMessage";
import { useTableSearchParams } from "@/shared/hooks/useTableSearchParams";
import { useConfirmStore } from "@/shared/store/confirm.store";
import { DEPOSIT_ADD_MESSAGES } from "../configs/depositAdd.messages";
import { useCreateDeposit } from "../hooks/useCreateDeposit";

export const DepositAddPage = () => {
  const { page, search, handleSearch, handlePage } = useTableSearchParams();

  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  const quickDepositMutation = useCreateDeposit();

  const { data, isPending, isError, refetch } = useMembers({
    page,
    limit: 10,
    search,
  });

  const members = data?.data ?? [];

  const meta = data?.meta;

  const handleQuickDeposit = async (member: ITenantMember, amount: number) => {
    const quickDepositMsg = (
      <RecordDeleteMessage
        description="Are you sure you want to add this deposit?"
        details={[
          {
            label: "Member",
            value: member.user.name,
            highlight: true,
          },
          {
            label: "Amount",
            value: amount,
            highlight: true,
          },
          {
            label: "Payment Method",
            value: "Cash",
          },
        ]}
      />
    );
    openConfirm({
      title: "Add Deposit",
      message: quickDepositMsg,

      onConfirm: async () => {
        try {
          setLoading(true);

          await quickDepositMutation.mutateAsync({
            memberId: member.user.id,
            amount,
            paymentMethod: "Cash",
            note: "",
          });
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

  // Show the error only when there is no cached data to display
  if (isError && !data) {
    const { title, description } = DEPOSIT_ADD_MESSAGES.error;

    return (
      <ErrorState
        title={title}
        description={description}
        onRetry={() => refetch()}
      />
    );
  }
  return (
    <>
      {members.length === 0 ? (
        <EmptyState
          title={
            search
              ? DEPOSIT_ADD_MESSAGES.emptySearch.title
              : DEPOSIT_ADD_MESSAGES.empty.title
          }
          description={
            search
              ? DEPOSIT_ADD_MESSAGES.emptySearch.description
              : DEPOSIT_ADD_MESSAGES.empty.description
          }
        />
      ) : (
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
        </>
      )}

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

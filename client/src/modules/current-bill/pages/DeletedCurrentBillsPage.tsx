import { ArchiveRestore, RotateCcw } from "lucide-react";
import { useMemo } from "react";

import { DepositTableSkeleton } from "@/modules/deposit/components/DepositTableSkeleton";
import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { ErrorState } from "@/shared/components/feedback/ErrorState";
import { Button } from "@/shared/components/ui/Button";
import { MemberAvatar } from "@/shared/components/ui/MemberAvatar";
import { Table, type TableColumn } from "@/shared/components/ui/Table";
import { useConfirmStore } from "@/shared/store/confirm.store";
import { formatTaka } from "@/shared/utils/format.utils";
import { formatMonthName } from "@/shared/utils/date.utils";

import { useDeletedCurrentBills } from "../hooks/useDeletedCurrentBills";
import { useRestoreCurrentBill } from "../hooks/useRestoreCurrentBill";
import type { ICurrentBill } from "../types/currentBill.types";

export const DeletedCurrentBillsPage = () => {
  const { data, isPending, isError, refetch } = useDeletedCurrentBills();
  const restoreMutation = useRestoreCurrentBill();

  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  const handleRestore = (bill: ICurrentBill) => {
    const memberName = bill.member?.name ?? `Member #${bill.userId}`;
    const period = `${formatMonthName(bill.month)}/${bill.year}`;

    openConfirm({
      title: "Restore Current Bill",
      message: `Restore ${memberName}'s current bill for ${period}? The bill will return to the active current-bill list.`,
      confirmText: "Restore",
      cancelText: "Cancel",

      onConfirm: async () => {
        try {
          setLoading(true);
          await restoreMutation.mutateAsync(bill.id);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const columns = useMemo<TableColumn<ICurrentBill>[]>(
    () => [
      {
        key: "member",
        title: "Member",
        render: (bill) => (
          <MemberAvatar
            name={bill.member?.name ?? `Member #${bill.userId}`}
            avatar={bill.member?.avatar}
          />
        ),
      },
      {
        key: "amount",
        title: "Amount",
        render: (bill) => formatTaka(Number(bill.amount)),
      },
      {
        key: "period",
        title: "Billing Period",
        render: (bill) => `${formatMonthName(bill.month)} ${bill.year}`,
      },
      {
        key: "status",
        title: "Status",
        render: (bill) => (
          <span className="badge badge-outline capitalize">
            {bill.status.replaceAll("_", " ")}
          </span>
        ),
      },
      {
        key: "deletedAt",
        title: "Deleted At",
        render: (bill) =>
          bill.deletedAt
            ? new Date(bill.deletedAt).toLocaleString()
            : "—",
      },
      {
        key: "actions",
        title: "Actions",
        render: (bill) => (
          <Button
            variant="success"
            leftIcon={<RotateCcw size={16} />}
            disabled={restoreMutation.isPending}
            loading={
              restoreMutation.isPending &&
              restoreMutation.variables === bill.id
            }
            onClick={() => handleRestore(bill)}
          >
            Restore
          </Button>
        ),
      },
    ],
    [restoreMutation.isPending, restoreMutation.variables],
  );

  if (isPending) {
    return <DepositTableSkeleton />;
  }

  if (isError || !data) {
    return (
      <ErrorState
        title="Failed to Load Deleted Current Bills"
        description="Unable to load deleted current bills. Please try again."
        onRetry={() => void refetch()}
      />
    );
  }

  const deletedBills = (data.data ?? []).filter(
    (bill) => Boolean(bill.deletedAt),
  );

  if (deletedBills.length === 0) {
    return (
      <EmptyState
        title="No Deleted Current Bills"
        description="Deleted current bills will appear here when available."
      />
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <ArchiveRestore
          size={22}
          className="text-theme-text-muted"
          aria-hidden="true"
        />
        <div>
          <h2 className="text-lg font-semibold">
            Deleted Current Bills
          </h2>
          <p className="text-sm text-theme-text-muted">
            Restore previously deleted bills to the active list.
          </p>
        </div>
      </div>

      <Table
        columns={columns}
        data={deletedBills}
        message={{
          empty: {
            title: "No Deleted Current Bills",
            description: "There are no deleted current bills to display.",
          },
        }}
        refetch={() => void refetch()}
      />
    </section>
  );
};
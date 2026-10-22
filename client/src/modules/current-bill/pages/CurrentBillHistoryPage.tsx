import { useState } from "react";
import { useParams } from "react-router-dom";

import { DepositHistoryTableSkeleton } from "@/modules/deposit/components/DepositHistoryTableSkeleton";
import { DEPOSIT_MESSAGES } from "@/modules/deposit/configs/deposit.messages";
import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { ErrorState } from "@/shared/components/feedback/ErrorState";
import { AnimatedNumber } from "@/shared/components/ui/AnimatedNumber";
import { MemberHeader } from "@/shared/components/ui/MemberHeader";
import { Table } from "@/shared/components/ui/Table";
import { CurrentBillFormModal } from "../components/CurrentBillFormModal";
import { useCurrentBillHistoryColumns } from "../configs/currentBillHistory.config";
import { useCurrentBill } from "../hooks/useCurrentBill";
import type { ICurrentBill } from "../types/currentBill.types";

export const CurrentBillHistoryPage = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState<ICurrentBill | null>(
    null,
  );

  const { userId: memberIdParam } = useParams<{ userId: string }>();
  const memberId = Number(memberIdParam);

  const { data, isPending, isError, refetch } = useCurrentBill(memberId);

  const handleEdit = (currentBill: ICurrentBill) => {
    setSelectedDeposit(currentBill);
    setIsEditOpen(true);
  };

  const columns = useCurrentBillHistoryColumns(handleEdit);

  if (isPending) {
    return <DepositHistoryTableSkeleton />;
  }

  if (isError || !data) {
    return (
      <ErrorState
        title={DEPOSIT_MESSAGES.error.title}
        description={DEPOSIT_MESSAGES.error.description}
        onRetry={() => void refetch()}
      />
    );
  }

  const currentBills = data.data ?? [];

  if (currentBills.length === 0) {
    return (
      <EmptyState
        title={DEPOSIT_MESSAGES.memberNotFound.title}
        description={DEPOSIT_MESSAGES.memberNotFound.description}
      />
    );
  }

  const currentBill = currentBills[0];

  const { name, avatar } = currentBill.member ?? {};

  return (
    <>
      <MemberHeader
        name={name}
        avatar={avatar}
        subtitle="Current Bill History"
        rightContent={
          <div className="text-right">
            <p className="text-xs text-theme-text-muted">Total Current Bill</p>
            <p className="font-bold text-theme-success tabular-nums">
              <AnimatedNumber value={0} prefix="৳ " duration={1000} />
            </p>
          </div>
        }
      />

      <Table columns={columns} data={data.data} message={DEPOSIT_MESSAGES} />

      <CurrentBillFormModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedDeposit(null);
        }}
        currentBill={selectedDeposit ?? undefined}
      />
    </>
  );
};

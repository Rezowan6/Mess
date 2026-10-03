import { useState } from "react";
import { useParams } from "react-router-dom";

import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { ErrorState } from "@/shared/components/feedback/ErrorState";
import { AnimatedNumber } from "@/shared/components/ui/AnimatedNumber";
import { MemberHeader } from "@/shared/components/ui/MemberHeader";
import { Table } from "@/shared/components/ui/Table";
import { AddDepositModal } from "../components/AddDepositModal";
import { DepositTableSkeleton } from "../components/DepositTableSkeleton";
import { useDepositHistoryColumns } from "../configs/deposit.history.columns";
import { DEPOSIT_MESSAGES } from "../configs/deposit.messages";
import { useDeposits } from "../hooks/useDeposits";
import type { IDeposit } from "../types/deposit.types";

export const DepositHistoryPage = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState<IDeposit | null>(null);

  const { memberId: memberIdParam } = useParams<{ memberId: string }>();
  const memberId = Number(memberIdParam);

  const { data, isPending, isError, refetch } = useDeposits();

  const handleEdit = (deposit: IDeposit) => {
    setSelectedDeposit(deposit);
    setIsEditOpen(true);
  };

  const columns = useDepositHistoryColumns(handleEdit);

  if (isPending) {
    return <DepositTableSkeleton />;
  }

  // Show the error only when there is no cached data to display
  if (isError && !data) {
    return (
      <ErrorState
        title={DEPOSIT_MESSAGES.error.title}
        description={DEPOSIT_MESSAGES.error.description}
        onRetry={() => refetch()}
      />
    );
  }

  const memberDeposits = (data?.data ?? []).filter(
    (item) => Number(item.memberId) === memberId,
  );

  const firstDeposit = memberDeposits[0];

  if (!firstDeposit) {
    return (
      <EmptyState
        title={DEPOSIT_MESSAGES.memberNotFound.title}
        description={DEPOSIT_MESSAGES.memberNotFound.description}
      />
    );
  }

  const { name, avatar } = firstDeposit.member;

  const totalDeposit = memberDeposits.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  );

  return (
    <>
      <MemberHeader
        name={name}
        avatar={avatar}
        subtitle="Deposit History"
        rightContent={
          <div className="text-right">
            <p className="text-xs text-base-content/60">Total Deposit</p>
            <p className="font-bold text-success tabular-nums">
              <AnimatedNumber
                value={totalDeposit}
                prefix="৳ "
                duration={1000}
              />
            </p>
          </div>
        }
      />

      <Table
        columns={columns}
        data={memberDeposits}
        message={DEPOSIT_MESSAGES}
      />

      <AddDepositModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedDeposit(null);
        }}
        deposit={selectedDeposit ?? undefined}
      />
    </>
  );
};

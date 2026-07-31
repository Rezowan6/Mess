import { useLocation } from "react-router-dom";

import { BackButton } from "@/shared/components/ui/BackButton";
import { Table } from "@/shared/components/ui/Table";
import { DepositInfoCard } from "../components/DepositInfoCard";
import { DepositTableSkeleton } from "../components/DepositTableSkeleton";
import { useDepositHistoryColumns } from "../configs/deposit.history.columns";
import { DEPOSIT_MESSAGES } from "../configs/deposit.messages";
import { useDeposits } from "../hooks/useDeposits";

import { useState } from "react";

import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { AddDepositModal } from "../components/AddDepositModal";
import type { IDeposit } from "../types/deposit.types";

export const DepositHistoryPage = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedDeposit, setSelectedDeposit] = useState<IDeposit | null>(null);
  const location = useLocation();

  const { data, isPending } = useDeposits();

  const handleEdit = (deposit: IDeposit) => {
    setSelectedDeposit(deposit);
    setIsEditOpen(true);
  };

  const columns = useDepositHistoryColumns(handleEdit);

  const memberId = location.state?.memberId;

  if (isPending) {
    return <DepositTableSkeleton />;
  }

  if (!data) {
    return (
      <EmptyState
        title={DEPOSIT_MESSAGES.empty.title}
        description={DEPOSIT_MESSAGES.empty.description}
      />
    );
  }

  const memberDeposits = data.data.filter((item) => item.memberId === memberId);

  const member = memberDeposits[0].member;

  const totalDeposit = memberDeposits.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Deposit History</h2>

          <p className="text-sm opacity-70">
            View all deposits for this member.
          </p>
        </div>

        <BackButton />
      </div>

      <DepositInfoCard memberName={member.name} totalDeposit={totalDeposit} />

      <Table
        columns={columns}
        data={memberDeposits}
        loading={isPending}
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
    </div>
  );
};

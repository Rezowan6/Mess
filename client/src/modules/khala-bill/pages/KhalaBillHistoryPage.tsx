import { useState } from "react";
import { useParams } from "react-router-dom";

import { DepositHistoryTableSkeleton } from "@/modules/deposit/components/DepositHistoryTableSkeleton";
import { EmptyState } from "@/shared/components/feedback/EmptyState";
import { ErrorState } from "@/shared/components/feedback/ErrorState";
import { AnimatedNumber } from "@/shared/components/ui/AnimatedNumber";
import { MemberHeader } from "@/shared/components/ui/MemberHeader";
import { Table } from "@/shared/components/ui/Table";

import { KhalaBillFormModal } from "../components/KhalaBillFormModal";
import { KHALA_BILL_MESSAGES } from "../configs/khalaBill.messages";
import { useKhalaBillHistoryColumns } from "../configs/khalaBillHistory.config";
import { useKhalaBill } from "../hooks/useKhalaBill";
import type { IKhalaBill } from "../types/khalaBill.types";

export const KhalaBillHistoryPage = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<IKhalaBill | null>(null);

  const { userId } = useParams<{ userId: string }>();
  const memberId = Number(userId);

  const { data, isPending, isError, refetch } = useKhalaBill(memberId);

  const handleEdit = (bill: IKhalaBill) => {
    setSelectedBill(bill);
    setIsEditOpen(true);
  };

  const columns = useKhalaBillHistoryColumns(handleEdit);

  if (isPending) return <DepositHistoryTableSkeleton />;

  if (isError || !data) {
    return (
      <ErrorState
        title={KHALA_BILL_MESSAGES.error.title}
        description={KHALA_BILL_MESSAGES.error.description}
        onRetry={() => void refetch()}
      />
    );
  }

  const bills = data.data ?? [];

  if (bills.length === 0) {
    return (
      <EmptyState
        title={KHALA_BILL_MESSAGES.memberNotFound.title}
        description={KHALA_BILL_MESSAGES.memberNotFound.description}
      />
    );
  }

  const member = bills[0].member;
  const totalAmount = bills.reduce((sum, bill) => sum + Number(bill.amount), 0);

  return (
    <>
      <MemberHeader
        name={member?.name}
        avatar={member?.avatar}
        subtitle="Khala Bill History"
        rightContent={
          <div className="text-right">
            <p className="text-xs text-theme-text-muted">
              Total Khala Bill This Year
            </p>
            <p className="font-bold text-theme-success tabular-nums">
              <AnimatedNumber value={totalAmount} prefix="৳ " duration={1000} />
            </p>
          </div>
        }
      />

      <Table columns={columns} data={bills} message={KHALA_BILL_MESSAGES} />

      <KhalaBillFormModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedBill(null);
        }}
        khalaBill={selectedBill ?? undefined}
      />
    </>
  );
};

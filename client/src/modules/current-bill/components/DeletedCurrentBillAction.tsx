import { RotateCcw } from "lucide-react";

import { Button } from "@/shared/components/ui/Button";
import { TOOLTIP_TEXT } from "@/shared/constants/tooltip.config";
import { RecordDeleteMessage } from "@/shared/data-display/RecordDeleteMessage";
import { useConfirmStore } from "@/shared/store/confirm.store";
import { formatMonthName, isRecordLocked } from "@/shared/utils/date.utils";
import { formatTaka } from "@/shared/utils/format.utils";

import { CURRENT_BILL_MESSAGES } from "../configs/currentBill.messages";
import { useRestoreCurrentBill } from "../hooks/useRestoreCurrentBill";
import type { ICurrentBill } from "../types/currentBill.types";

interface Props {
  currentBill: ICurrentBill;
}

export const DeletedCurrentBillAction = ({ currentBill }: Props) => {
  const restoreMutation = useRestoreCurrentBill();

  const openConfirm = useConfirmStore((state) => state.openConfirm);
  const setLoading = useConfirmStore((state) => state.setLoading);

  // Same 24 hour rule as the server, the server is the real authority
  const locked = isRecordLocked(currentBill.createdAt);

  const { restore } = CURRENT_BILL_MESSAGES.deleted;

  const handleRestore = () =>
    openConfirm({
      title: restore.title,
      confirmText: restore.confirmText,
      message: (
        <RecordDeleteMessage
          description={restore.description}
          details={[
            {
              label: "Member",
              value:
                currentBill.member?.name ?? `Member #${currentBill.userId}`,
              highlight: true,
            },
            {
              label: "Amount",
              value: formatTaka(Number(currentBill.amount)),
            },
            {
              label: "Month",
              value: `${formatMonthName(currentBill.month)}/${currentBill.year}`,
            },
          ]}
        />
      ),
      onConfirm: async () => {
        try {
          setLoading(true);
          await restoreMutation.mutateAsync(currentBill.id);
        } finally {
          setLoading(false);
        }
      },
    });

  return (
    <div className="flex items-center gap-4">
      <Button
        unstyled
        aria-label="Restore current bill"
        disabled={locked}
        tooltip={locked ? TOOLTIP_TEXT.LOCKED_AFTER_24H : undefined}
        leftIcon={<RotateCcw />}
        className="text-theme-success"
        onClick={handleRestore}
      />
    </div>
  );
};

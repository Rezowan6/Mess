import { ReceiptText } from "lucide-react";

import { RecoveryItem } from "@/shared/components/ui/RecoveryItem";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { ROUTES } from "@/shared/constants/routes";
import type { RecoveryEntry } from "@/shared/types/recovery.types";

const CurrentBillRecoveryItem = () => (
  <RecoveryItem
    title="Current Bills"
    description="View deleted monthly current bills and restore them to the active list."
    icon={<ReceiptText size={20} />}
    to={`${ROUTES.CURRENT_BILL}/deleted`}
  />
);

export const currentBillRecovery: RecoveryEntry = {
  key: "current-bill",
  permission: PERMISSIONS.CURRENT_BILL_VIEW,
  Component: CurrentBillRecoveryItem,
};

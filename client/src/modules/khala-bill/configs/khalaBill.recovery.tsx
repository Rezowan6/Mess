import { FileClock } from "lucide-react";

import { RecoveryItem } from "@/shared/components/ui/RecoveryItem";
import { PERMISSIONS } from "@/shared/constants/permissions";
import type { RecoveryEntry } from "@/shared/types/recovery.types";

// When the Khala Bill recovery page is ready:
// remove `unavailable` and pass `to={`${ROUTES.KHALA_BILL}/deleted`}` instead
const KhalaBillRecoveryItem = () => (
  <RecoveryItem
    title="Khala Bills"
    description="Recovery will be available here after the Khala Bill recovery page is implemented."
    icon={<FileClock size={20} />}
    unavailable
  />
);

export const khalaBillRecovery: RecoveryEntry = {
  key: "khala-bill",
  permission: PERMISSIONS.KHALA_BILL_VIEW,
  Component: KhalaBillRecoveryItem,
};

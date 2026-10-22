import clsx from "clsx";
import { ArchiveRestore, ChevronDown } from "lucide-react";
import { useId, useState } from "react";

import { currentBillRecovery } from "@/modules/current-bill/configs/currentBill.recovery";
import { khalaBillRecovery } from "@/modules/khala-bill/configs/khalaBill.recovery";
import { SettingsCard } from "@/modules/settings/components/SettingsCard";
import { Button } from "@/shared/components/ui/Button";
import { useRBAC } from "@/shared/hooks/useRBAC";
import type { RecoveryEntry } from "@/shared/types/recovery.types";

// The order here is the order on screen. A new module only adds one line.
const RECOVERY_ENTRIES: RecoveryEntry[] = [
  currentBillRecovery,
  khalaBillRecovery,
];

export const DataRecoverySettings = () => {
  const { can } = useRBAC();
  const [isOpen, setIsOpen] = useState(false);
  const listId = useId();

  const visibleEntries = RECOVERY_ENTRIES.filter((entry) =>
    can(entry.permission),
  );

  // All hooks are above this line, so the early return is safe
  if (visibleEntries.length === 0) {
    return null;
  }

  return (
    <SettingsCard
      title="Data Recovery"
      description="Find deleted records and restore them when recovery is available."
      icon={<ArchiveRestore size={22} />}
    >
      <div className="space-y-3">
        <Button
          variant="primary"
          aria-expanded={isOpen}
          aria-controls={listId}
          leftIcon={
            <ChevronDown
              className={clsx(
                "transition-transform duration-200",
                isOpen && "rotate-180",
              )}
            />
          }
          onClick={() => setIsOpen((previous) => !previous)}
        >
          {isOpen
            ? "Hide recovery options"
            : `Show recovery options (${visibleEntries.length})`}
        </Button>

        {isOpen && (
          <ul id={listId} className="space-y-3">
            {visibleEntries.map(({ key, Component }) => (
              <Component key={key} />
            ))}
          </ul>
        )}
      </div>
    </SettingsCard>
  );
};

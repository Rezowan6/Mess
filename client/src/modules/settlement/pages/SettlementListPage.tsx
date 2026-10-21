import { useMemo, useState } from "react";

import { useSettlements } from "../hooks/useSettlements";
import type { ISettlement } from "../types/settlement.types";

import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { formatCurrency } from "@/shared/utils/currency";

const STATUS_VARIANTS: Record<
  ISettlement["status"],
  "soft-success" | "soft-warning" | "soft-error" | "soft-info" | "soft-info"
> = {
  PENDING: "soft-warning",
  PAID: "soft-success",
  CANCELLED: "soft-error",
  DISPUTED: "soft-error",
  RESOLVED: "soft-info",
};

export const SettlementListPage = () => {
  const { data, isLoading, isError, refetch } = useSettlements();
  const { can } = useRBAC();
  const [selectedSettlement, setSelectedSettlement] =
    useState<ISettlement | null>(null);

  const settlements = useMemo(() => data?.data ?? [], [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-3 py-8 text-center">
        <p className="text-error">Failed to load settlements.</p>
        <Button variant="outline" onClick={() => void refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  if (settlements.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-lg font-semibold">No settlements found</h3>
        <p className="mt-2 text-sm text-base-content/60">
          Settlements will appear here when they are created.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-base-300">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>Member</th>
              <th>Payer → Payee</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {settlements.map((settlement) => (
              <tr key={settlement.id}>
                <td>#{settlement.id}</td>
                <td>{settlement.memberId}</td>
                <td>
                  {settlement.payerId} → {settlement.payeeId}
                </td>
                <td className="font-medium">
                  {formatCurrency(
                    Number(settlement.amount),
                    settlement.currency,
                  )}
                </td>
                <td>{settlement.paymentMethod}</td>
                <td>
                  <Badge variant={STATUS_VARIANTS[settlement.status]}>
                    {settlement.status}
                  </Badge>
                </td>
                <td>
                  {new Date(settlement.createdAt).toLocaleDateString()}
                </td>
                <td>
                  {can(PERMISSIONS.SETTLEMENT_UPDATE) && (
                    <Button
                      variant="outline"
                      onClick={() => setSelectedSettlement(settlement)}
                    >
                      View
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedSettlement && (
        <div className="rounded-xl border border-base-300 p-4">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-semibold">
              Settlement #{selectedSettlement.id}
            </h3>
            <Button
              variant="ghost"
              onClick={() => setSelectedSettlement(null)}
            >
              Close
            </Button>
          </div>

          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-base-content/60">Amount</dt>
              <dd className="font-medium">
                {formatCurrency(
                  Number(selectedSettlement.amount),
                  selectedSettlement.currency,
                )}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-base-content/60">Status</dt>
              <dd>{selectedSettlement.status}</dd>
            </div>

            <div>
              <dt className="text-sm text-base-content/60">
                Transaction Reference
              </dt>
              <dd>{selectedSettlement.transactionReference || "—"}</dd>
            </div>

            <div>
              <dt className="text-sm text-base-content/60">Note</dt>
              <dd>{selectedSettlement.note || "—"}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
};
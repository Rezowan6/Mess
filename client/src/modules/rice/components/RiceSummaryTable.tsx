import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";

import { AddRicePaymentModal } from "@/modules/rice-payment/components/AddRicePaymentModal";
import { PayAllRiceDueModal } from "@/modules/rice-payment/components/PayAllRiceDueModal";
import { Button } from "@/shared/components/ui/Button";
import { SummaryStat } from "@/shared/components/ui/SummaryStat";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { Wallet } from "lucide-react";
import { RICE_MESSAGES } from "../configs/rice.message";
import { useRiceSummaryColumns } from "../configs/rice.summary.columns";
import { useRiceSummaryTable } from "../hooks/useRiceSummaryTable";
import { AddRiceModal } from "./AddRiceModal";
import { RiceTableSkeleton } from "./skeleton/RiceTableSkeleton";

export const RiceSummaryTable = () => {
  const { can } = useRBAC();
  const canManage = can(PERMISSIONS.EXPENSE_CREATE);

  const {
    rice,
    meta,
    isPending,
    isError,
    refetch,
    search,
    handleSearch,
    handlePage,

    payingRice,
    openPayModal,
    closePayModal,

    editingRice,
    openEditModal,
    closeEditModal,

    handleDelete,

    isPayAllOpen,
    openPayAll,
    closePayAll,
    dueSummary,
  } = useRiceSummaryTable();

  const columns = useRiceSummaryColumns({
    onPay: openPayModal,
    onEdit: openEditModal,
    onDelete: handleDelete,
  });

  const hasDue = dueSummary.dueCount > 0;

  // The total is always visible; only the Pay All button is restricted
  const showPayAll = canManage && search === "" && hasDue;

  return (
    <div className="space-y-4">
      {/* Always rendered, so typing never loses focus */}
      <SearchInput
        value={search}
        onChange={handleSearch}
        placeholder="by supplier name"
      />

      {!isPending && (
        <div className="flex flex-wrap items-stretch gap-3">
          <SummaryStat
            label="Total Rice Cost"
            amount={dueSummary.totalAmount}
            tone="info"
            className="grow sm:grow-0"
          />

          <SummaryStat
            label="Total Paid"
            amount={dueSummary.totalPaid}
            tone="success"
            className="grow sm:grow-0"
          />
            <SummaryStat
              label="Total Due"
              amount={dueSummary.totalDue}
              tone={hasDue ? "error" : "success"}
              className="grow"
              hint={
                hasDue && (
                  <>
                    · {dueSummary.dueCount}{" "}
                    {dueSummary.dueCount === 1 ? "purchase" : "purchases"}
                  </>
                )
              }
              action={
                showPayAll && (
                  <Button
                    type="button"
                    variant="pay"
                    leftIcon={<Wallet />}
                    onClick={openPayAll}
                    className="w-full sm:w-fit"
                  >
                    Pay All Due
                  </Button>
                )
              }
            />
          </div>
      )}

      {/* ...Table, Pagination and modals stay unchanged... */}

      {isPending ? (
        <RiceTableSkeleton />
      ) : (
        <>
          <Table
            columns={columns}
            data={rice}
            error={isError}
            message={RICE_MESSAGES}
            refetch={refetch}
          />

          {meta && meta.totalPages > 1 && (
            <Pagination
              page={meta.page}
              totalPages={meta.totalPages}
              onChange={handlePage}
            />
          )}
        </>
      )}

      <AddRicePaymentModal
        isOpen={payingRice !== null}
        onClose={closePayModal}
        rice={payingRice}
      />

      <AddRiceModal
        isOpen={editingRice !== null}
        onClose={closeEditModal}
        rice={editingRice ?? undefined}
      />

      <PayAllRiceDueModal
        isOpen={isPayAllOpen}
        onClose={closePayAll}
        totalDue={dueSummary.totalDue}
        dueCount={dueSummary.dueCount}
      />
    </div>
  );
};

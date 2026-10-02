import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";

import { AddRicePaymentModal } from "@/modules/rice-payment/components/AddRicePaymentModal";
import { PayAllRiceDueModal } from "@/modules/rice-payment/components/PayAllRiceDueModal";
import { Button } from "@/shared/components/ui/Button";
import { PERMISSIONS } from "@/shared/constants/permissions";
import { useRBAC } from "@/shared/hooks/useRBAC";
import { formatTaka } from "@/shared/utils/format.utils";
import { Wallet } from "lucide-react";
import { RICE_MESSAGES } from "../configs/rice.message";
import { useRiceSummaryColumns } from "../configs/rice.summary.columns";
import { useRiceSummaryTable } from "../hooks/useRiceSummaryTable";
import { AddRiceModal } from "./AddRiceModal";
import { RiceTableSkeleton } from "./RiceTableSkeleton";

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

  if (isPending) return <RiceTableSkeleton />;

  // Hidden while searching: the backend settles ALL dues, not only the filtered rows
  const showDueBar = canManage && search === "" && dueSummary.dueCount > 0;

  return (
    <div className="space-y-4">
      {showDueBar && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-info/10 p-3 text-sm">
          <p>
            Total due{" "}
            <strong className="text-error">
              {formatTaka(dueSummary.totalDue)}
            </strong>
            <span className="opacity-70">
              {" "}
              · {dueSummary.dueCount}{" "}
              {dueSummary.dueCount === 1 ? "purchase" : "purchases"}
            </span>
          </p>

          <Button
            type="button"
            variant="pay"
            leftIcon={<Wallet />}
            onClick={openPayAll}
          >
            Pay All Due
          </Button>
        </div>
      )}

      <SearchInput
        value={search}
        onChange={handleSearch}
        placeholder="by supplier name"
      />

      <Table
        columns={columns}
        data={rice}
        loading={isPending}
        error={isError}
        message={RICE_MESSAGES}
        refetch={refetch}
      />

      {meta && (
        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          onChange={handlePage}
        />
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

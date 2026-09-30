import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";

import { AddRicePaymentModal } from "@/modules/rice-payment/components/AddRicePaymentModal";
import { RICE_MESSAGES } from "../configs/rice.message";
import { useRiceSummaryColumns } from "../configs/rice.summary.columns";
import { useRiceSummaryTable } from "../hooks/useRiceSummaryTable";
import { RiceTableSkeleton } from "./RiceTableSkeleton";

export const RiceSummaryTable = () => {
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
  } = useRiceSummaryTable();

  const columns = useRiceSummaryColumns({
    onPay: openPayModal,
  });

  if (isPending) return <RiceTableSkeleton />;

  return (
    <div className="space-y-4">
      <SearchInput
        value={search}
        onChange={handleSearch}
        placeholder="Search by supplier name"
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
    </div>
  );
};

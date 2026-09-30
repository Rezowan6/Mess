import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";

import { RICE_MESSAGES } from "../configs/rice.message";
import { useRiceSummaryColumns } from "../configs/rice.summary.columns";
import { useRiceSummaryTable } from "../hooks/useRiceSummaryTable";
import { AddRiceModal } from "./AddRiceModal";
import { RiceTableSkeleton } from "./RiceTableSkeleton";

export const RiceSummaryTable = () => {
  const {
    rice,
    meta,
    isPending,
    isError,
    refetch,
    search,
    isEditOpen,
    handleCloseEdit,
    selectedRice,
    handleSearch,
    handlePage,
  } = useRiceSummaryTable();

  const columns = useRiceSummaryColumns();

  if (isPending) {
    return <RiceTableSkeleton />;
  }

  return (
    <div className="space-y-4">
      <SearchInput
        value={search}
        onChange={handleSearch}
        placeholder="member name"
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

      <AddRiceModal
        isOpen={isEditOpen}
        onClose={handleCloseEdit}
        rice={selectedRice ?? undefined}
      />
    </div>
  );
};

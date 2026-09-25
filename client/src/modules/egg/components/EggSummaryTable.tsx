import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";

import { EGG_MESSAGES } from "../configs/egg.message";
import { useEggSummaryColumns } from "../configs/egg.summary.columns";
import { useEggSummaryTable } from "../hooks/useEggSummaryTable";
import { AddEggModal } from "./AddEggModal";
import { EggTableSkeleton } from "./EggTableSkeleton";

export const EggSummaryTable = () => {
  const {
    eggs,
    meta,
    isPending,
    isError,
    refetch,
    search,
    isEditOpen,
    handleCloseEdit,
    selectedEgg,
    handleSearch,
    handlePage,
    handleEdit,
  } = useEggSummaryTable();

  const columns = useEggSummaryColumns(handleEdit);

  if (isPending) {
    return <EggTableSkeleton />;
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
        data={eggs}
        loading={isPending}
        error={isError}
        message={EGG_MESSAGES}
        refetch={refetch}
      />

      {meta && (
        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          onChange={handlePage}
        />
      )}

      <AddEggModal
        isOpen={isEditOpen}
        onClose={handleCloseEdit}
        egg={selectedEgg ?? undefined}
      />
    </div>
  );
};

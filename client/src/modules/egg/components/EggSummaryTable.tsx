import { DataTableSection } from "@/shared/components/ui/DataTableSection";

import { EGG_MESSAGES } from "../configs/egg.message";
import { useEggSummaryColumns } from "../configs/egg.summary.columns";
import { useEggSummaryTable } from "../hooks/useEggSummaryTable";
import { AddEggModal } from "./AddEggModal";
import { EggTableSkeleton } from "./skeleton/EggTableSkeleton";

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
  } = useEggSummaryTable();

  const columns = useEggSummaryColumns();

  const totalEgg = eggs.reduce(
    (sum, item) => sum + Number(item.quantity ?? 0),
    0,
  );

  return (
    <>
      <DataTableSection
        columns={columns}
        data={eggs}
        meta={meta}
        isPending={isPending}
        isError={isError}
        refetch={refetch}
        skeleton={<EggTableSkeleton />}
        message={EGG_MESSAGES}
        search={search}
        onSearch={handleSearch}
        onPageChange={handlePage}
        searchPlaceholder="member name"
        summary={{
          label: "Total Egg",
          amount: totalEgg,
          suffix: " pcs",
        }}
      />

      <AddEggModal
        isOpen={isEditOpen}
        onClose={handleCloseEdit}
        egg={selectedEgg ?? undefined}
      />
    </>
  );
};

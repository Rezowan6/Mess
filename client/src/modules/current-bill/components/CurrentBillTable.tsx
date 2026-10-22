import { DataTableSection } from "@/shared/components/ui/DataTableSection";
import { useTableSearchParams } from "@/shared/hooks/useTableSearchParams";

import { DepositTableSkeleton } from "@/modules/deposit/components/DepositTableSkeleton";
import { DEPOSIT_MESSAGES } from "@/modules/deposit/configs/deposit.messages";
import { useCurrentBillsColumns } from "../configs/currentBills.columns";
import { useCurrentBills } from "../hooks/useCurrentBills";

const PAGE_LIMIT = 10;

export const CurrentBillTable = () => {
  const { page, search, handleSearch, handlePage } = useTableSearchParams();

  const { data, isPending, isError, refetch } = useCurrentBills();

  const columns = useCurrentBillsColumns();

  const totalDeposit =
    data?.data?.reduce((sum, item) => sum + Number(item.amount), 0) ?? 0;

  return (
    <DataTableSection
      columns={columns}
      data={data?.data ?? []}
      meta={data?.meta}
      isPending={isPending}
      isError={isError}
      refetch={refetch}
      skeleton={<DepositTableSkeleton />}
      message={DEPOSIT_MESSAGES}
      search={search}
      onSearch={handleSearch}
      onPageChange={handlePage}
      summary={{
        label: "Total Deposit",
        amount: Number(totalDeposit),
        prefix: "৳ ",
      }}
    />
  );
};

import { DataTableSection } from "@/shared/components/ui/DataTableSection";
import { useTableSearchParams } from "@/shared/hooks/useTableSearchParams";

import { DepositTableSkeleton } from "@/modules/deposit/components/DepositTableSkeleton";
import { DEPOSIT_MESSAGES } from "@/modules/deposit/configs/deposit.messages";
import { useCurrentBillsColumns } from "../configs/currentBills.columns";
import { useCurrentBills } from "../hooks/useCurrentBills";

const PAGE_LIMIT = 10;
const SEARCH_PLACEHOLDERS = ["member name", "email"]

export const CurrentBillTable = () => {
  const { page, search, handleSearch, handlePage } = useTableSearchParams();

  const { data, isPending, isError, refetch } = useCurrentBills({
    page,
    limit: PAGE_LIMIT,
    search,
  });

  const columns = useCurrentBillsColumns();

  const totalCurrentBill =
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
      placeholderTexts={SEARCH_PLACEHOLDERS}
      summary={{
        label: "Total Current Bill",
        amount: Number(totalCurrentBill),
        prefix: "৳ ",
      }}
    />
  );
};

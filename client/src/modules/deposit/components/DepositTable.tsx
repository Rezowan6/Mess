import { DataTableSection } from "@/shared/components/ui/DataTableSection";
import { useTableSearchParams } from "@/shared/hooks/useTableSearchParams";

import { useDepositMemberSummaryColumns } from "../configs/deposit.member.summary.columns";
import { DEPOSIT_MESSAGES } from "../configs/deposit.messages";
import { useMemberDepositSummary } from "../hooks/useMemberDepositSummary";
import { DepositTableSkeleton } from "./DepositTableSkeleton";

const PAGE_LIMIT = 10;
const SEARCH_PLACEHOLDERS = ["member name", "email"];

export const DepositTable = () => {
  const { page, search, handleSearch, handlePage } = useTableSearchParams();

  const { data, isPending, isError, refetch } = useMemberDepositSummary({
    page,
    limit: PAGE_LIMIT,
    search,
  });

  const columns = useDepositMemberSummaryColumns();

  const totalDeposit =
    data?.data?.reduce((sum, item) => sum + Number(item.totalDeposit), 0) ?? 0;

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
        label: "Total Deposit",
        amount: Number(totalDeposit),
        prefix: "৳ ",
      }}
    />
  );
};

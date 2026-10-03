import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";
import { useTableSearchParams } from "@/shared/hooks/useTableSearchParams";

import { useDepositMemberSummaryColumns } from "../configs/deposit.member.summary.columns";
import { DEPOSIT_MESSAGES } from "../configs/deposit.messages";
import { useMemberDepositSummary } from "../hooks/useMemberDepositSummary";
import { DepositTableSkeleton } from "./DepositTableSkeleton";

const PAGE_LIMIT = 10;

export const DepositTable = () => {
  const { page, search, handleSearch, handlePage } = useTableSearchParams();

  const { data, isPending, isError, refetch } = useMemberDepositSummary({
    page,
    limit: PAGE_LIMIT,
    search,
  });

  const deposits = data?.data ?? [];

  const meta = data?.meta;

  const columns = useDepositMemberSummaryColumns();

  return (
    <div className="space-y-4">
      {/* Always rendered, so typing never loses focus */}
      <SearchInput value={search} onChange={handleSearch} />

      {isPending ? (
        <DepositTableSkeleton />
      ) : (
        <>
          <Table
            columns={columns}
            data={deposits}
            error={isError}
            message={DEPOSIT_MESSAGES}
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
    </div>
  );
};

import { useMemo } from "react";

import { DepositTableSkeleton } from "@/modules/deposit/components/DepositTableSkeleton";
import { DataTableSection } from "@/shared/components/ui/DataTableSection";
import { useTableSearchParams } from "@/shared/hooks/useTableSearchParams";

import { KHALA_BILL_MESSAGES } from "../configs/khalaBill.messages";
import { useKhalaBillsColumns } from "../configs/khalaBills.columns";
import { useKhalaBills } from "../hooks/useKhalaBills";

const SEARCH_PLACEHOLDERS = ["member name", "email"]

export const KhalaBillTable = () => {
  const { search, handleSearch } = useTableSearchParams();
  const { data, isPending, isError, refetch } = useKhalaBills();
  const columns = useKhalaBillsColumns();

  const bills = data?.data ?? [];

  const filteredBills = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return bills;

    return bills.filter((bill) => {
      const name = bill.member?.name?.toLowerCase() ?? "";
      const amount = String(bill.amount);
      const status = bill.status.toLowerCase();

      return (
        name.includes(query) || amount.includes(query) || status.includes(query)
      );
    });
  }, [bills, search]);

  const totalAmount = filteredBills.reduce(
    (sum, bill) => sum + Number(bill.amount),
    0,
  );

  return (
    <DataTableSection
      columns={columns}
      data={filteredBills}
      isPending={isPending}
      isError={isError}
      refetch={refetch}
      skeleton={<DepositTableSkeleton />}
      message={KHALA_BILL_MESSAGES}
      search={search}
      onSearch={handleSearch}
      placeholderTexts={SEARCH_PLACEHOLDERS}
      summary={{
        label: "Total Khala Bill",
        amount: totalAmount,
        prefix: "৳ ",
      }}
    />
  );
};

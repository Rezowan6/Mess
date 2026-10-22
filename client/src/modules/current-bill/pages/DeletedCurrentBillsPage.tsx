import { useMemo } from "react";

import { Table } from "@/shared/components/ui/Table";

import { CURRENT_BILL_MESSAGES } from "../configs/currentBill.messages";
import { useDeletedCurrentBillsColumns } from "../configs/deletedCurrentBills.columns";
import { useDeletedCurrentBills } from "../hooks/useDeletedCurrentBills";

export const DeletedCurrentBillsPage = () => {
  const { data, isPending, isError, refetch } = useDeletedCurrentBills();
  const columns = useDeletedCurrentBillsColumns();

  // Defensive: this list must only ever hold deleted bills
  const deletedBills = useMemo(
    () => (data?.data ?? []).filter((bill) => Boolean(bill.deletedAt)),
    [data],
  );

  return (
    <Table
      columns={columns}
      data={deletedBills}
      loading={isPending}
      error={isError}
      message={CURRENT_BILL_MESSAGES.deleted}
      refetch={refetch}
    />
  );
};

import {
  TableSkeleton,
  type TableSkeletonColumn,
} from "@/shared/components/feedback/TableSkeleton";

const DEPOSIT_HISTORY_SKELETON_COLUMNS: TableSkeletonColumn[] = [
  { key: "createdAt", title: "Date", skeleton: "h-4 w-28" },
  { key: "amount", title: "Amount", skeleton: "h-4 w-20" },
  {
    key: "paymentMethod",
    title: "Payment Method",
    skeleton: "h-7 w-24 rounded-full",
  },
];

export const DepositHistorySkeleton = () => {
  return <TableSkeleton columns={DEPOSIT_HISTORY_SKELETON_COLUMNS} rows={5} />;
};

import { MemberHeaderSkeleton } from "@/shared/components/feedback/MemberHeaderSkeleton";
import {
  TableSkeleton,
  type TableSkeletonColumn,
} from "@/shared/components/feedback/TableSkeleton";

const DEPOSIT_SKELETON_COLUMNS: TableSkeletonColumn[] = [
  { key: "date", title: "Date", skeleton: "h-4 w-32" },
  { key: "amount", title: "Amount", skeleton: "h-4 w-20" },
  {
    key: "paymentMethod",
    title: "Payment Method",
    skeleton: "h-7 w-24 rounded-full",
  },
  { key: "note", title: "Note", skeleton: "h-4 w-40", hideOnMobile: true },
  {
    key: "action",
    title: "Action",
    skeleton: ["h-9 w-20 rounded-theme-lg", "h-9 w-20 rounded-theme-lg"],
  },
];

export const DepositTableSkeleton = () => {
  return (
    <>
      {/* Header */}
      <MemberHeaderSkeleton
        subtitle="Deposit History"
        rightLabel="Total Deposit"
      />

      {/* Table */}
      <TableSkeleton columns={DEPOSIT_SKELETON_COLUMNS} rows={5} />
    </>
  );
};

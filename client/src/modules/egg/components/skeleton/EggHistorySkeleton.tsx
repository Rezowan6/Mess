import { MemberHeaderSkeleton } from "@/shared/components/feedback/MemberHeaderSkeleton";
import {
  TableSkeleton,
  type TableSkeletonColumn,
} from "@/shared/components/feedback/TableSkeleton";

export const EggHistorykeleton = () => {
  const DEPOSIT_SKELETON_COLUMNS: TableSkeletonColumn[] = [
    { key: "date", title: "Date", skeleton: "h-4 w-32" },
    { key: "eggQuantity", title: "Egg Quantity", skeleton: "h-4 w-20" },
    { key: "Action", title: "Action", skeleton: "h-4 w-20" },
  ];

  return (
    <>
      <MemberHeaderSkeleton
        subtitle="Egg History"
        rightLabel="Total Eggs"
      />
      <TableSkeleton columns={DEPOSIT_SKELETON_COLUMNS} rows={5} />
    </>
  );
};

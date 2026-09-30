import { useState } from "react";
import { useLocation } from "react-router-dom";

import { Table } from "@/shared/components/ui/Table";

import { AddRiceModal } from "../components/AddRiceModal";
import { riceHistoryColumns } from "../configs/rice.history.columns";
import { useRice } from "../hooks/useRice";
import type { IRice } from "../types/rice.types";
import { MemberHeader } from "@/shared/components/ui/MemberHeader";

export const RiceHistoryPage = () => {
  const [selectedRice, setSelectedRice] = useState<IRice | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const location = useLocation();

  const { data, isPending, isError, refetch } = useRice();

  const memberId = location.state?.memberId ?? 0;

  const rice: IRice[] = data?.data ?? [];

  const memberRice: IRice[] = rice.filter(
    (item) => item.createdBy === memberId,
  );

  const handleEdit = (rice: IRice) => {
    setSelectedRice(rice);
    setIsEditOpen(true);
  };

  const columns = riceHistoryColumns(handleEdit);

  const totalRice = memberRice.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );

  return (
    <>
      <div className="space-y-4">
        <MemberHeader
          name={memberRice[0]?.creator?.name}
          avatar={memberRice[0]?.creator?.avatar}
          subtitle="Rice History"
          rightContent={
            <div className="text-right">
              <p className="text-xs text-base-content/60">Total Rice</p>
              <p className="font-bold">{totalRice}</p>
            </div>
          }
        />

        <Table
          columns={columns}
          data={memberRice}
          loading={isPending}
          error={isError}
          refetch={refetch}
        />
      </div>

      <AddRiceModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedRice(null);
        }}
        rice={selectedRice ?? undefined}
      />
    </>
  );
};

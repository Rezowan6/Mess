import { useLocation } from "react-router-dom";

import { Table } from "@/shared/components/ui/Table";

import { MemberHeader } from "@/shared/components/ui/MemberHeader";
import { useState } from "react";
import { AddEggModal } from "../components/AddEggModal";
import { eggHistoryColumns } from "../configs/egg.history.columns";
import { useEggs } from "../hooks/useEggs";
import type { IEgg } from "../types/egg.types";

export const EggHistoryPage = () => {
  const [selectedEgg, setSelectedEgg] = useState<IEgg | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const location = useLocation();

  const { data, isPending, isError, refetch } = useEggs();

  const memberId = location.state?.memberId ?? 0;

  const eggs: IEgg[] = data?.data ?? [];

  const memberEggs: IEgg[] = eggs?.filter((egg) => egg.memberId === memberId);

  const handleEdit = (egg: IEgg) => {
    setSelectedEgg(egg);
    setIsEditOpen(true);
  };

  const columns = eggHistoryColumns(handleEdit);

  const name = memberEggs[0]?.member?.name;
  const avatar = memberEggs[0]?.member?.avatar;

  const totalEggs = memberEggs.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );

  return (
    <>
      <div className="space-y-4">
        <MemberHeader
          name={name}
          avatar={avatar}
          subtitle="Egg History"
          rightContent={
            <div className="text-right">
              <p className="text-xs text-base-content/60">Total Eggs</p>
              <p className="font-bold">{totalEggs}</p>
            </div>
          }
        />
        <Table
          columns={columns}
          data={memberEggs}
          loading={isPending}
          error={isError}
          refetch={refetch}
        />
      </div>

      <AddEggModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedEgg(null);
        }}
        egg={selectedEgg ?? undefined}
      />
    </>
  );
};

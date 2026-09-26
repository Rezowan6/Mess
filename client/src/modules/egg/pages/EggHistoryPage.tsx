import { useLocation } from "react-router-dom";

import { Table } from "@/shared/components/ui/Table";

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

  const eggs = data?.data ?? [];

  const memberEggs = eggs.filter((egg) => egg.memberId === memberId);

  const handleEdit = (egg: IEgg) => {
    setSelectedEgg(egg);
    setIsEditOpen(true);
  };

  const columns = eggHistoryColumns(handleEdit);

  return (
    <>
      <div className="space-y-4">
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
        egg={selectedEgg}
      />
    </>
  );
};

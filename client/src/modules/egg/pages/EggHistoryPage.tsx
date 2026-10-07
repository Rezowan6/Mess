import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { AnimatedNumber } from "@/shared/components/ui/AnimatedNumber";
import { MemberHeader } from "@/shared/components/ui/MemberHeader";
import { Table } from "@/shared/components/ui/Table";
import { AddEggModal } from "../components/AddEggModal";
import { EggHistorykeleton } from "../components/skeleton/EggHistorySkeleton";
import { eggHistoryColumns } from "../configs/egg.history.columns";
import { useEggs } from "../hooks/useEggs";
import type { IEgg } from "../types/egg.types";

export const EggHistoryPage = () => {
  const { memberId: memberIdParam } = useParams<{ memberId: string }>();
  const parsedId = Number(memberIdParam);
  const memberId = Number.isInteger(parsedId) ? parsedId : undefined;

  const [selectedEgg, setSelectedEgg] = useState<IEgg | null>(null);

  const { data, isPending, isError, refetch } = useEggs();

  const handleEdit = useCallback((egg: IEgg) => setSelectedEgg(egg), []);
  const handleCloseEdit = useCallback(() => setSelectedEgg(null), []);

  // Called directly (not inside useMemo) because it may use hooks internally
  const columns = eggHistoryColumns(handleEdit);

  const memberEggs = useMemo<IEgg[]>(() => {
    if (memberId === undefined) return [];

    return (data?.data ?? []).filter((egg: any) => egg.memberId === memberId);
  }, [data, memberId]);

  const totalEggs = useMemo(
    () =>
      memberEggs.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0),
    [memberEggs],
  );

  if (isPending) {
    return <EggHistorykeleton />;
  }

  if (memberId === undefined) {
    return (
      <p className="py-10 text-center text-sm text-theme-text-muted">
        Member not found. Please open this page from the egg list.
      </p>
    );
  }

  const name = memberEggs[0]?.member?.name ?? "Unknown member";
  const avatar = memberEggs[0]?.member?.avatar;

  return (
    <>
      <div className="space-y-4">
        {!isError && (
          <MemberHeader
            name={name}
            avatar={avatar}
            subtitle="Egg History"
            rightContent={
              <div className="text-right">
                <p className="text-xs text-theme-text-muted">Total Eggs</p>
                <p className="font-bold tabular-nums text-theme-success">
                  <AnimatedNumber value={totalEggs} duration={1000} />
                </p>
              </div>
            }
          />
        )}

        <Table
          columns={columns}
          data={memberEggs}
          error={isError}
          refetch={refetch}
        />
      </div>

      <AddEggModal
        isOpen={selectedEgg !== null}
        onClose={handleCloseEdit}
        egg={selectedEgg ?? undefined}
      />
    </>
  );
};

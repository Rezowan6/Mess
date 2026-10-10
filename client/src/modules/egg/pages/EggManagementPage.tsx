import { EggRateFormModal } from "@/modules/egg-rate/components/EggRateFormModal";
import { useEggRate } from "@/modules/egg-rate/hooks/useEggRate";
import { useEffect, useState } from "react";
import { EggSummaryTable } from "../components/EggSummaryTable";

export const EggManagementPage = () => {
  const { data, isPending } = useEggRate();

  const [isOpen, setIsOpen] = useState(false);

  const eggRate = data?.data;

  useEffect(() => {
    if (!isPending && !eggRate) {
      setIsOpen(true);
    }
  }, [isPending, eggRate]);
  return (
    <>
      <EggSummaryTable />

      <EggRateFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        eggRate={eggRate}
      />
    </>
  );
};

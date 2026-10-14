import { Button } from "@/shared/components/ui/Button";

import { useDownloadMonthlyCalculationPdf } from "../hooks/useDownloadMonthlyCalculationPdf";
import { useMonthlyCalculation } from "../hooks/useMonthlyCalculation";
import { getLocalDate } from "@/shared/utils/date.utils";

interface Props {
  tenantName: string;
  periodLabel: string;
}

export const MonthlyCalculationPdfButton = ({ tenantName, periodLabel }: Props) => {
  const { data } = useMonthlyCalculation(); // same query key, served from cache
  const { download, isGenerating } = useDownloadMonthlyCalculationPdf();

  const calculation = data?.data;
  if (!calculation) return null;

  return (
    <Button
      disabled={isGenerating}
      onClick={() =>
        download(
          {
            calculation,
            tenantName,
            periodLabel,
            generatedAt: getLocalDate(),
          },
          `monthly-calculation-${periodLabel.replace(/\s+/g, "-").toLowerCase()}.pdf`,
        )
      }
    >
      {isGenerating ? "Preparing..." : "Download PDF"}
    </Button>
  );
};
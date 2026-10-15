import { useTenantStore } from "@/modules/tenant/store/tenant.store";
import { Button } from "@/shared/components/ui/Button";
import { getLocalDate } from "@/shared/utils/date.utils";

import { useDownloadMonthlyCalculationPdf } from "../hooks/useDownloadMonthlyCalculationPdf";
import { useMonthlyCalculation } from "../hooks/useMonthlyCalculation";

export const MonthlyCalculationPdfButton = () => {
  const tenantName =
    useTenantStore((state) => state.currentTenant?.tenant?.name) || "Smart Mess";

  const { data } = useMonthlyCalculation(); // same query key, served from cache
  const { download, isGenerating } = useDownloadMonthlyCalculationPdf();

  const calculation = data?.data;

  // Covers both undefined and empty members
  if (!calculation || !calculation.members?.length) return null;

  // Period comes from the same data that is printed, so they can never mismatch
  const periodLabel = `${calculation.month}-${calculation.year}`;

  const handleDownload = () =>
    download(
      {
        calculation,
        tenantName,
        periodLabel,
        generatedAt: getLocalDate(),
      },
      `monthly-calculation-${periodLabel.replace(/\s+/g, "-").toLowerCase()}.pdf`,
    );

  return (
    <Button onClick={handleDownload} disabled={isGenerating}>
      {isGenerating ? "Preparing..." : "Download PDF"}
    </Button>
  );
};
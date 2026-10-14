import { useState } from "react";

import type { MonthlyCalculationPdfProps } from "../components/pdf/MonthlyCalculationPdf";

export const useDownloadMonthlyCalculationPdf = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const download = async (props: MonthlyCalculationPdfProps, fileName: string) => {
    if (isGenerating) return; // prevent double click

    setIsGenerating(true);

    try {
      // Heavy library is loaded only when the user actually clicks
      const [{ pdf }, { MonthlyCalculationPdf },] =
        await Promise.all([
          import("@react-pdf/renderer"),
          import("../components/pdf/MonthlyCalculationPdf"),
        ]);

      const blob = await pdf(<MonthlyCalculationPdf {...props} />).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch(error) {
      // use your existing toast utility here
        console.error("PDF generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return { download, isGenerating };
};
import { Select } from "@/shared/components/ui/Select";
import { CalendarDays } from "lucide-react";
import { useState } from "react";

export const DashboardMonthSelector = () => {
  const currentDate = new Date();

  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(currentDate.getFullYear(), index, 1);

    return {
      value: index,
      label: date.toLocaleString("en-US", { month: "long" }),
    };
  });

  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());

  return (
    <div className="min-w-40">
      <Select
        options={months}
        value={selectedMonth}
        onChange={(event) => {
          setSelectedMonth(Number(event.target.value));
        }}

        leftIcon={<CalendarDays size={17} />}
      />
    </div>
  );
};

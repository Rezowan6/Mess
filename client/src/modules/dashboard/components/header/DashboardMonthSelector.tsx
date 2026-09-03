import { CalendarDays, ChevronDown } from "lucide-react";
import { useState } from "react";

export const DashboardMonthSelector = () => {
  const [isOpen, setIsOpen] = useState(false);

  const currentDate = new Date();

  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(currentDate.getFullYear(), index, 1);

    return {
      value: index,
      label: date.toLocaleString("en-US", { month: "long" }),
    };
  });

  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());

  const selected = months[selectedMonth];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="
          flex min-w-40 items-center justify-between gap-3
          rounded-md border border-success/40
          bg-info/10 px-3 py-2
          text-sm font-medium
          shadow-sm
          transition-all duration-200
          hover:border-info/40
          hover:bg-background
        "
      >
        <span className="flex items-center gap-2">
          <CalendarDays size={17} className="text-primary" />

          <span>{selected.label}</span>
        </span>

        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`
          absolute right-0 top-full z-50 mt-0.5
          w-full min-w-40
          origin-top
          overflow-hidden rounded-lg
          border border-success/40
          bg-background
          p-1
          shadow-lg
          transition-all duration-200
          ${
            isOpen
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-2 scale-95 opacity-0"
          }
        `}
        role="listbox"
      >
        {months.map((month) => (
          <button
            key={month.value}
            type="button"
            role="option"
            aria-selected={selectedMonth === month.value}
            onClick={() => {
              setSelectedMonth(month.value);
              setIsOpen(false);
            }}
            className={`
              w-full rounded-md px-3 py-2 text-left text-sm
              transition-colors duration-150
              ${
                selectedMonth === month.value
                  ? "bg-info/10 font-semibold text-accent"
                  : "text-text hover:bg-info/10"
              }
            `}
          >
            {month.label}
          </button>
        ))}
      </div>
    </div>
  );
};

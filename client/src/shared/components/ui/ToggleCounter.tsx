import { CounterButton } from "./CounterButton";
import { ToggleSwitch } from "./ToggleSwitch";

interface ToggleCounterProps {
  label: string;
  value: number; // 0 = off, >=1 = on
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  error?: string;
}

export function ToggleCounter({
  label,
  value,
  onChange,
  min = 1,
  max = Number.MAX_SAFE_INTEGER,
  error,
}: ToggleCounterProps) {
  const isOn = value > 0;

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  return (
    <div className="relative flex items-center justify-between border-b border-theme-border py-2">
      <span className="text-sm font-medium text-theme-text">{label}</span>

      <div className="flex items-center gap-2">
        <ToggleSwitch
          checked={isOn}
          onChange={(checked) => onChange(checked ? min : 0)}
        />

        {/* toggle */}
        <div
          className={`absolute right-20 flex items-center transition-all duration-300 ease-in-out ${
            isOn
              ? "visible translate-x-0 opacity-100"
              : "invisible -translate-x-2 opacity-0"
          }`}
        >
          <CounterButton
            position="left"
            onClick={handleDecrement}
            disabled={value <= min}
          >
            −
          </CounterButton>

          <span className="flex h-7 min-w-8 items-center justify-center px-2 text-sm font-medium text-theme-text">
            {value}
          </span>

          <CounterButton
            position="right"
            onClick={handleIncrement}
            disabled={value >= max}
          >
            +
          </CounterButton>
        </div>
      </div>

      {error && <p className="text-sm text-theme-danger">{error}</p>}
    </div>
  );
}

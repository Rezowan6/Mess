import { Button } from "./Button";

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

  const handleToggle = () => {
    onChange(isOn ? 0 : min);
  };

  const handleIncrement = () => {
    if (value < max) onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  return (
    <div className="relative flex items-center justify-between gap-3 py-1">
      <span className="text-sm font-medium">{label}</span>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant={`${isOn ? "success" : "secondary"}`}
          onClick={handleToggle}
        >
          {isOn ? "On" : "Off"}
        </Button>

        {/* toggle */}
        <div
          className={`absolute right-20 flex items-center gap-1 transition-all duration-300 ease-in-out ${isOn ? "visible translate-x-0 opacity-100" : "invisible -translate-x-2 opacity-0"}`}
        >
          <Button
            type="button"
            variant="error"
            onClick={handleDecrement}
            disabled={value <= min}
            className="w-1"
          >
            -
          </Button>
          <span className="w-5 text-center text-sm">{value}</span>
          <Button
            type="button"
            variant="accent"
            onClick={handleIncrement}
            disabled={value >= max}
            className="w-1"
          >
            +
          </Button>
        </div>
      </div>

      {error && <p className="text-error text-sm">{error}</p>}
    </div>
  );
}

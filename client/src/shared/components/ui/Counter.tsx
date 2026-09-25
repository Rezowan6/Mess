import { CounterButton } from "./CounterButton";

interface CounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export const Counter = ({
  value,
  onChange,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  disabled = false,
}: CounterProps) => {
  const handleIncrement = () => {
    if (value < max && !disabled) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min && !disabled) {
      onChange(value - 1);
    }
  };

  return (
    <div className="flex items-center">
      <CounterButton
        position="left"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
      >
        −
      </CounterButton>

      <span className="flex h-7 min-w-8 items-center justify-center px-2 text-sm font-medium">
        {value}
      </span>

      <CounterButton
        position="right"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
      >
        +
      </CounterButton>
    </div>
  );
};

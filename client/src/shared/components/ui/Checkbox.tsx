interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Checkbox = ({
  checked,
  onChange,
  disabled = false,
}: CheckboxProps) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        flex h-5 w-5 shrink-0 items-center justify-center rounded-md
        border transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary/30
        disabled:cursor-not-allowed disabled:opacity-50
        ${
          checked
            ? "border-accent bg-gradient-success text-text"
            : "border-info bg-info/30 hover:border-primary/60"
        }
      `}
    >
      {checked && (
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className="h-3.5 w-3.5"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            d="M4 10.5 8 14l8-8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
};

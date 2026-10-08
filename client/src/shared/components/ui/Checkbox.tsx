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
        flex h-5 w-5 shrink-0 items-center justify-center rounded-theme-sm
        border transition-all duration-200
        disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer
        ${
          checked
            ? "border-theme-success-soft bg-theme-success-gradient text-theme-on-dark"
            : "border-theme-input-border bg-theme-input"
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

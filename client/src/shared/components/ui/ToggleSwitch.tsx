interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

export const ToggleSwitch = ({
  checked,
  onChange,
  disabled = false,
  label,
}: ToggleSwitchProps) => {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3">
      {label && (
        <span className="text-sm font-medium text-theme-text">{label}</span>
      )}

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={[
          "relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          checked
            ? "bg-theme-success"
            : "bg-theme-surface-sunken ring-1 ring-theme-border",
        ].join(" ")}
      >
        <span
          className={[
            "inline-block h-5 w-5 rounded-full bg-theme-on-dark shadow-theme-sm transition-transform duration-300",
            checked ? "translate-x-6" : "translate-x-1",
          ].join(" ")}
        />
      </button>
    </label>
  );
};

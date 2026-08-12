interface StatusIndicatorProps {
  active?: boolean;
  activeClassName?: string;
  inactiveClassName?: string;
  className?: string;
}

export const StatusIndicator = ({
  active = false,
  activeClassName = "bg-info",
  inactiveClassName = "bg-success",
  className = "",
}: StatusIndicatorProps) => {
  return (
    <div
      className={[
        "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
        active ? activeClassName : inactiveClassName,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
};

import { useMountAnimation } from "@/shared/hooks/useMountAnimation";

interface Props {
  paidPercent: number;
}

export const RicePaymentProgress = ({ paidPercent }: Props) => {
  const mounted = useMountAnimation();

  const percent = Number.isFinite(paidPercent)
    ? Math.min(100, Math.max(0, paidPercent))
    : 0;

  return (
    <div className="space-y-1">
      <div
        role="progressbar"
        aria-label="Paid percentage"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="h-2 w-full overflow-hidden rounded-full bg-theme-surface-sunken"
      >
        <div
          className="h-full rounded-full bg-theme-success-gradient transition-[width] duration-700 ease-out"
          style={{ width: mounted ? `${percent}%` : "0%" }}
        />
      </div>

      <p className="text-xs text-theme-text-muted">{percent}% paid</p>
    </div>
  );
};

interface Props {
  paidPercent: number;
}

export const RicePaymentProgress = ({ paidPercent }: Props) => {
  return (
    <div className="space-y-1">
      <progress
        className="progress progress-success w-full"
        value={paidPercent}
        max={100}
      />

      <p className="text-xs opacity-60">
        {paidPercent}% paid
      </p>
    </div>
  );
};
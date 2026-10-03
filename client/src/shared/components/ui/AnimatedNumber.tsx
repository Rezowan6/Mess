import { useCountUp } from "@/shared/hooks/useCountUp";

interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

export const AnimatedNumber = ({
  value,
  prefix = "",
  suffix = "",
  decimals = 2,
  duration,
}: Props) => {
  const animated = useCountUp(value, duration);

  return (
    <>
      {prefix}
      {animated.toFixed(decimals)}
      {suffix}
    </>
  );
};

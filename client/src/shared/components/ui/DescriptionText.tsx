import { useState } from "react";

interface DescriptionTextProps {
  text?: string | null;
  maxWords?: number;
  className?: string;
}

export const DescriptionText = ({
  text,
  maxWords = 6,
  className,
}: DescriptionTextProps) => {
  const [expanded, setExpanded] = useState(false);

  if (!text?.trim()) return null;

  // trim first, otherwise leading or trailing spaces create empty "words"
  const words = text.trim().split(/\s+/);
  const shouldTruncate = words.length > maxWords;

  const firstPart = words.slice(0, maxWords).join(" ");
  const restPart = words.slice(maxWords).join(" ");

  if (!shouldTruncate) {
    return <p className={className}>{firstPart}</p>;
  }

  const toggleButton = (label: string) => (
    <button
      type="button"
      aria-expanded={expanded}
      onClick={() => setExpanded((previous) => !previous)}
      className="ml-1 cursor-pointer font-medium text-theme-info hover:underline"
    >
      {label}
    </button>
  );

  return (
    <p className={className}>
      {firstPart}

      {expanded ? (
        // block = the rest of the text starts on a new line
        <span className="block">
          {restPart}
          {toggleButton("Less")}
        </span>
      ) : (
        toggleButton("... More")
      )}
    </p>
  );
};

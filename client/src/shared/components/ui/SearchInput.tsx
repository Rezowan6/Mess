import { useDebounce } from "@/shared/hooks/useDebounce";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./Input";
import { TypingText } from "./TypingText";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  placeholderTexts?: string[];
}

export const SearchInput = ({
  value,
  onChange,
  placeholder,
  placeholderTexts,
}: Props) => {
  const [input, setInput] = useState(value);

  const debouncedValue = useDebounce(input, 600);

  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, value, onChange]);

  useEffect(() => {
    setInput(value);
  }, [value]);

  return (
    <div className="relative">
      <Input
        leftIcon={<Search size={18} />}
        value={input}
        placeholder={
          placeholderTexts?.length ? "" : `Search ${placeholder || "member"}...`
        }
        onChange={(e) => setInput(e.target.value)}
      />

      {!input && placeholderTexts?.length ? (
        <div className="pointer-events-none absolute inset-y-0 left-10 right-3 text-theme-text-muted flex items-center overflow-hidden">
          <TypingText
            texts={placeholderTexts}
            prefix="Search by"
            typeSpeed={100}
            backSpeed={60}
            backDelay={1000}
            loop
            showCursor
            className="truncate text-sm text-base-content/50"
          />
        </div>
      ) : null}
    </div>
  );
};

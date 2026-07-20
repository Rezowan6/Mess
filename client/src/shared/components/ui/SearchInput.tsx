import { useDebounce } from "@/shared/hooks/useDebounce";
import { useEffect, useState } from "react";
import { Input } from "./Input";

interface Props {
  value: string;

  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: Props) => {
  const [input, setInput] = useState(value);

  const debouncedValue = useDebounce(input, 500);

  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    setInput(value);
  }, [value]);

  return (
    <Input
      value={input}
      placeholder="Search member..."
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

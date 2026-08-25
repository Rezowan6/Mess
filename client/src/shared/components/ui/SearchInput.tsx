import { useDebounce } from "@/shared/hooks/useDebounce";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./Input";

interface Props {
  value: string;

  onChange: (value: string) => void;

  placeholder?: string;
}

export const SearchInput = ({ value, onChange, placeholder }: Props) => {
  const [input, setInput] = useState(value);

  const debouncedValue = useDebounce(input, 600);

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
      leftIcon={<Search size={18} />}
      value={input}
      placeholder={`${placeholder ? `Search ${placeholder}...` : "Search member..."}`}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

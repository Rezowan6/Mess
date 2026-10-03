import { useSearchParams } from "react-router-dom";

interface UseSearchParamsOnlyOptions {
  key?: string;
}

export const useSearchParamsOnly = ({
  key = "search",
}: UseSearchParamsOnlyOptions = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get(key) || "";

  const handleSearch = (value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        if (value.trim()) {
          next.set(key, value);
        } else {
          next.delete(key);
        }

        return next;
      },
      { replace: true },
    );
  };

  return {
    search,
    handleSearch,
  };
};

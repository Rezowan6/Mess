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
    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    setSearchParams(params, {
      replace: true,
    });
  };

  return {
    search,
    handleSearch,
  };
};
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface UseTableSearchParamsOptions {
  defaultPage?: number;
  resetPageOnMount?: boolean;
}

export const useTableSearchParams = (
  options: UseTableSearchParamsOptions = {},
) => {
  const { defaultPage = 1, resetPageOnMount = true } = options;

  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * URL Query Params
   */
  const rawPage = Number(searchParams.get("page"));

  // Accept only positive whole numbers
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : defaultPage;

  const search = searchParams.get("search") || "";

  /**
   * Search (keeps other params, goes back to the first page)
   */
  const handleSearch = (value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        next.set("page", String(defaultPage));

        if (value) {
          next.set("search", value);
        } else {
          next.delete("search");
        }

        return next;
      },
      { replace: true },
    );
  };

  /**
   * Pagination (keeps other params)
   */
  const handlePage = (nextPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      next.set("page", String(nextPage));

      return next;
    });
  };

  /**
   * Reset page on mount
   */
  useEffect(() => {
    if (!resetPageOnMount || page === defaultPage) {
      return;
    }

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        next.set("page", String(defaultPage));

        return next;
      },
      { replace: true },
    );
    // Intentionally runs only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    page,
    search,
    handleSearch,
    handlePage,
  };
};

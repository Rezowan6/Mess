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
  const page = Number(searchParams.get("page")) || defaultPage;

  const search = searchParams.get("search") || "";

  /**
   * Search
   */
  const handleSearch = (value: string) => {
    setSearchParams(
      {
        page: String(defaultPage),
        ...(value && {
          search: value,
        }),
      },
      {
        replace: true,
      },
    );
  };

  /**
   * Pagination
   */
  const handlePage = (nextPage: number) => {
    setSearchParams({
      page: String(nextPage),
      ...(search && {
        search,
      }),
    });
  };

  /**
   * Reset page
   */
  useEffect(() => {
    if (!resetPageOnMount || page === defaultPage) {
      return;
    }

    setSearchParams(
      {
        page: String(defaultPage),
        ...(search && {
          search,
        }),
      },
      {
        replace: true,
      },
    );
  }, []);

  return {
    page,
    search,
    handleSearch,
    handlePage,
  };
};

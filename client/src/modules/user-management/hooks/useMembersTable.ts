import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useMembers } from "./useMembers";

export const useMembersTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  /**
   * URL Query Params
   */

  const page = Number(searchParams.get("page")) || 1;

  const search = searchParams.get("search") || "";

  /**
   * Members Query
   */

  const { data, isPending, isError, refetch } = useMembers({
    page,

    limit: 10,

    search,
  });

  const members = data?.data ?? [];

  const meta = data?.meta;

  /**
   * Search Handler
   *
   * SearchInput already debounce করবে
   */

  const handleSearch = (value: string) => {
    setSearchParams(
      {
        page: "1",

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

  const handlePage = (page: number) => {
    setSearchParams({
      page: String(page),

      ...(search && {
        search,
      }),
    });
  };

  /**
   * Reset page when tenant changes
   * optional safety
   */

  useEffect(() => {
    if (page !== 1) {
      setSearchParams(
        {
          page: "1",

          ...(search && {
            search,
          }),
        },

        {
          replace: true,
        },
      );
    }
  }, []);

  return {
    page,
    search,
    members,
    meta,
    isPending,
    isError,
    refetch,
    handleSearch,
    handlePage,
  };
};

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Pagination } from "@/shared/components/ui/Pagination";
import { SearchInput } from "@/shared/components/ui/SearchInput";
import { Table } from "@/shared/components/ui/Table";

import { useMemberColumns } from "../constants/member.columns";
import { MEMBER_MESSAGES } from "../constants/member.messages";

import { useMembers } from "../hooks/useMembers";

import { MembersTableSkeleton } from "./MembersTableSkeleton";

export const MembersTable = () => {
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

  const columns = useMemberColumns();

  /**
   * First Loading
   */

  if (isPending) {
    return <MembersTableSkeleton />;
  }

  return (
    <div className="space-y-4">
      <SearchInput value={search} onChange={handleSearch} />

      {/* Table */}

      <Table
        columns={columns}
        data={members}
        loading={isPending}
        error={isError}
        message={MEMBER_MESSAGES}
        refetch={refetch}
      />

      {/* Pagination */}

      {meta && (
        <Pagination
          page={meta.page}
          totalPages={meta.totalPages}
          onChange={handlePage}
        />
      )}
    </div>
  );
};

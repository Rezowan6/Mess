import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import type {
  IMealPlanningResponse,
  MealType,
} from "../types/mealPlanning.types";
import { useDebounce } from "@/shared/hooks/useDebounce";

interface Props {
  planning?: IMealPlanningResponse["data"];
  activeMeal: MealType;
}

export const useMealPlanningTable = ({ planning, activeMeal }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const debouncedSearch  = useDebounce(search, 300);

  const limit = 10;

  const members = (planning?.[activeMeal] ?? []).filter((member) =>
    member.memberName.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  const totalPages = Math.max(1, Math.ceil(members.length / limit));

  const paginatedMembers = members.slice((page - 1) * limit, page * limit);

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

  const handlePage = (newPage: number) => {
    setSearchParams({
      page: String(newPage),
      ...(search && {
        search,
      }),
    });
  };

  useEffect(() => {
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
  }, [activeMeal, setSearchParams]);

  useEffect(() => {
    if (page > totalPages) {
      setSearchParams(
        {
          page: String(totalPages),
          ...(search && {
            search,
          }),
        },
        {
          replace: true,
        },
      );
    }
  }, [page, totalPages, search, setSearchParams]);

  return {
    page,
    search,
    limit,
    members,
    totalPages,
    paginatedMembers,
    handleSearch,
    handlePage,
  };
};

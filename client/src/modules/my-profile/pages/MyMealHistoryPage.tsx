import { sortByDateDesc } from "@/shared/utils/sort.utils";
import { MonthlyMealHistoryTable } from "../components/MonthlyMealHistoryTable";
import { useMyProfile } from "../hooks/useMyProfile";

export const MyMealHistoryPage = () => {
  const { data } = useMyProfile();

  const meals = data?.data?.meals ?? [];

  const sortedMeals = sortByDateDesc(meals, (meal) => meal.date);

  return <MonthlyMealHistoryTable meals={sortedMeals} />;
};

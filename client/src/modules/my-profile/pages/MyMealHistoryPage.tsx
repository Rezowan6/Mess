import { useMyMealEntries } from "@/modules/meal-entry/hooks";
import { sortByDateDesc } from "@/shared/utils/sort.utils";
import { MonthlyMealHistoryTable } from "../components/MonthlyMealHistoryTable";

export const MyMealHistoryPage = () => {
  const { data } = useMyMealEntries();

  console.log(data)

  const meals = data?.data?.meals ?? [];

  const sortedMeals = sortByDateDesc(meals, (meal) => meal.date);

  return (
    <MonthlyMealHistoryTable
      meals={sortedMeals}
      totalMeal={data?.data?.totalMeal ?? 0}
    />
  );
};

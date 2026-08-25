import { MonthlyMealHistoryTable } from "../components/MonthlyMealHistoryTable";
import { useMyProfile } from "../hooks/useMyProfile";

export const MyMealHistoryPage = () => {
  const { data } = useMyProfile();

  const meals = data?.data?.meals ?? [];

  return <MonthlyMealHistoryTable meals={meals} />;
};

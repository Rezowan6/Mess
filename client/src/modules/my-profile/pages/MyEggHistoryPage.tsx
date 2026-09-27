import { sortByDateDesc } from "@/shared/utils/sort.utils";
import { EggHistoryTable } from "../components/EggHistoryTable";
import { useMyProfile } from "../hooks/useMyProfile";

export const MyEggHistoryPage = () => {
  const { data } = useMyProfile();

  const eggs = data?.data?.eggs ?? [];

  const sortedEggs = sortByDateDesc(eggs, (egg) => egg.eggDate);

  return <EggHistoryTable eggs={sortedEggs} />;
};

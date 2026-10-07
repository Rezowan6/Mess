import { sortByDateDesc } from "@/shared/utils/sort.utils";
import { EggHistoryTable } from "../components/EggHistoryTable";
import { EggHistorySkeleton } from "../components/skeleton/EggHistorySkeleton";
import { useMyProfile } from "../hooks/useMyProfile";

export const MyEggHistoryPage = () => {
  const { data, isPending } = useMyProfile();

  if (isPending) {
    return <EggHistorySkeleton />;
  }

  const eggs = data?.data?.eggs ?? [];

  const sortedEggs = sortByDateDesc(eggs, (egg) => egg.eggDate);

  return <EggHistoryTable eggs={sortedEggs} />;
};

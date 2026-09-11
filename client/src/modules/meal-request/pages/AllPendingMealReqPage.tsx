import { Skeleton } from "@/shared/components/feedback/Skeleton";
import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { AllPendingMealReqTable } from "../components/pending/AllPendingMealReqTable";
import { useAllPendingMealReq } from "../hooks/useAllPendingMealReq";

export const AllPendingMealReqPage = () => {
  const { data, isPending } = useAllPendingMealReq();
  
  const requests = data?.data ?? [];

  if (isPending) {
    <Skeleton className="w-44 h-10" />;
  }
  return (
    <ManagementPage
      title="All Pending Meal Requests"
      description="Review, approve, reject, and manage pending meal requests from all members."
    >
      <AllPendingMealReqTable requests={requests} />
    </ManagementPage>
  );
};

import { ManagementPage } from "@/shared/components/layout/pages/ManagementPage";
import { AllPendingMealReqPageSkeleton } from "../components/pending/AllPendingMealReqPageSkeleton";
import { AllPendingMealReqTable } from "../components/pending/AllPendingMealReqTable";
import { useAllPendingMealReq } from "../hooks/useAllPendingMealReq";

export const AllPendingMealReqPage = () => {
  const { data, isPending } = useAllPendingMealReq();

  const requests = data?.data ?? [];

  if (isPending) {
    return <AllPendingMealReqPageSkeleton />;
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

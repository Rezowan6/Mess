import { useAllPendingMealReq } from "../hooks/useAllPendingMealReq";

export const AllPendingMealReqPage = () => {
  const { data } = useAllPendingMealReq();

  console.log(data);
  return <div>all pending meal req</div>;
};

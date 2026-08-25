import { RouteTabs } from "@/shared/components/ui/RouteTabs";
import { myProfileRouteTabs } from "../configs/myProfileRouteTabs.config";

export const MyProfileRouteTabs = () => {
  return <RouteTabs tabs={myProfileRouteTabs} />;
};

// src/shared/components/ui/RouteTabs.tsx

import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/shared/components/ui/Button";

export interface RouteTabItem {
  key: string;
  label: string;
  path: string;
}

interface Props {
  tabs: readonly RouteTabItem[];
}

export const RouteTabs = ({ tabs }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab =
    tabs.find((tab) => location.pathname === tab.path)?.key ?? tabs[0]?.key;

  return (
    <div className="flex flex-wrap gap-2 pb-3">
      {tabs.map((tab) => (
        <Button
          key={tab.key}
          className="w-24 h-fit"
          variant={activeTab === tab.key ? "primary" : "normal"}
          onClick={() => navigate(tab.path)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

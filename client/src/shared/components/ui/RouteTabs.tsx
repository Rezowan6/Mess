import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/shared/components/ui/Button";

export interface RouteTabItem {
  key: string;
  label: string;
  path: string;
  disabled?: boolean | undefined;
}

interface Props {
  tabs: readonly RouteTabItem[];
}

export const RouteTabs = ({ tabs }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = tabs
    .filter(
      (tab) =>
        location.pathname === tab.path ||
        location.pathname.startsWith(`${tab.path}/`),
    )
    .sort((a, b) => b.path.length - a.path.length)[0]?.key;

  return (
    <div className="flex flex-wrap gap-2 pb-3">
      {tabs.map((tab) => (
        <Button
          key={tab.key}
          className={`sm:w-24 flex-wrap h-fit`}
          variant={activeTab === tab.key ? "primary" : "normal"}
          onClick={() => navigate(tab.path)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

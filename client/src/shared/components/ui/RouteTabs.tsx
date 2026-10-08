import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/shared/components/ui/Button";
import { useSlidingIndicator } from "@/shared/hooks/useSlidingIndicator";
import { SlidingTabIndicator } from "./SlidingTabIndicator";

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

  const { containerRef, setItemRef, indicator } = useSlidingIndicator({
    activeKey: activeTab,
    itemCount: tabs.length,
  });

  return (
    <div
      ref={containerRef}
      role="tablist"
      className="relative mb-3 flex w-fit max-w-full flex-nowrap gap-1 overflow-x-auto rounded-full border  border-theme-border p-1 scrollbar-none [&::-webkit-scrollbar]:hidden"
    >
      {/* Glass Sliding Indicator */}
      <SlidingTabIndicator
        width={indicator.width}
        left={indicator.left}
        ready={indicator.ready}
      />

      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <Button
            key={tab.key}
            ref={setItemRef(tab.key)}
            role="tab"
            aria-selected={isActive}
            variant="ghost"
            onClick={() => navigate(tab.path)}
            className={`relative z-10 shrink-0 sm:min-w-24 active:scale-95 ${
              isActive ? "text-white! hover:bg-transparent!" : ""
            }`}
          >
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
};

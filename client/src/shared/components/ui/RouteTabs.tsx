import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/shared/components/ui/Button";
import { useSlidingIndicator } from "@/shared/hooks/useSlidingIndicator";

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
      className="relative mb-3 flex w-fit max-w-full flex-nowrap gap-1 overflow-x-auto rounded-full bg-success/10 p-1 scrollbar-none [&::-webkit-scrollbar]:hidden"
    >
      {/* Sliding pill (same look as the primary Button variant) */}
      <span
        aria-hidden="true"
        style={{
          width: indicator.width,
          transform: `translateX(${indicator.left}px)`,
        }}
        className={`pointer-events-none absolute bottom-1 left-0 top-1 rounded-full bg-linear-to-r from-blue-600 to-blue-900 shadow-md shadow-blue-900/30 ${
          indicator.ready
            ? "transition-[transform,width] duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)]"
            : "transition-none"
        }`}
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

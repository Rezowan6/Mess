import { Button } from "@/shared/components/ui/Button";
import { useSlidingIndicator } from "@/shared/hooks/useSlidingIndicator";
import { SlidingTabIndicator } from "./SlidingTabIndicator";

export interface TabItem<T extends string> {
  key: T;
  label: string;
  disabled?: boolean | undefined;
}

interface Props<T extends string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (tab: T) => void;
}

export const Tabs = <T extends string>({
  tabs,
  activeTab,
  onChange,
}: Props<T>) => {
  const { containerRef, setItemRef, indicator } = useSlidingIndicator({
    activeKey: activeTab,
    itemCount: tabs.length,
  });

  return (
    <div
      ref={containerRef}
      role="tablist"
      className="relative mb-3 flex w-fit max-w-full flex-nowrap gap-1 overflow-x-auto rounded-full border border-theme-border p-1 scrollbar-none [&::-webkit-scrollbar]:hidden"
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
            disabled={tab.disabled}
            onClick={() => onChange(tab.key)}
            className={`relative z-10 shrink-0 sm:min-w-24 active:scale-95 ${
              isActive ? "text-theme-text hover:bg-transparent!" : ""
            }`}
          >
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
};

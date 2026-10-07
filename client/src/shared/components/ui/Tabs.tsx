import { Button } from "@/shared/components/ui/Button";
import { useSlidingIndicator } from "@/shared/hooks/useSlidingIndicator";

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
      className="relative mb-3 flex w-fit max-w-full flex-nowrap gap-1 overflow-x-auto rounded-full bg-theme-success/10 p-1 scrollbar-none [&::-webkit-scrollbar]:hidden"
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
            disabled={tab.disabled}
            onClick={() => onChange(tab.key)}
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

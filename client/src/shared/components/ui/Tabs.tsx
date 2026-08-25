import { Button } from "@/shared/components/ui/Button";

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
  return (
    <div className="flex flex-wrap gap-2 pb-3">
      {tabs.map((tab) => (
        <Button
          key={tab.key}
          variant={activeTab === tab.key ? "primary" : "normal"}
          className="w-24 h-fit"
          onClick={() => onChange(tab.key)}
          disabled={tab.disabled ?? false}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

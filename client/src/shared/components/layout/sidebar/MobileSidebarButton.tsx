import { Menu } from "lucide-react";

import { useSidebarStore } from "@/store/sidebar.store";

export const MobileSidebarButton = () => {
  const toggle = useSidebarStore((state) => state.toggle);

  return (
    <button
      type="button"
      onClick={toggle}
      className="cursor-pointer hover:bg-info/10 p-2 rounded-md lg:hidden"
      aria-label="Open sidebar"
    >
      <Menu size={22} />
    </button>
  );
};

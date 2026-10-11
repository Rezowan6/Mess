import { LoaderIcon } from "lucide-react";

import { cn } from "@/shared/utils/cn";

interface PageLoaderProps {
  className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => {
  return (
    <div className={cn("flex h-screen items-center justify-center", className)}>
      <LoaderIcon
        role="status"
        aria-label="Loading"
        className="size-10 animate-spin text-theme-brand"
      />
    </div>
  );
};

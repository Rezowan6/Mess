import { LoaderIcon } from "lucide-react";

export const PageLoader = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoaderIcon className="size-10 animate-spin text-theme-brand" />
    </div>
  );
};

import { useOnlineStatus } from "@/shared/hooks/useOnlineStatus";
import { WifiOff } from "lucide-react";

export const OfflineMessage = () => {
  const { isOffline } = useOnlineStatus();

  if (!isOffline) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-base-100 px-6">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-base-200">
          <WifiOff size={38} />
        </div>

        <h2 className="text-2xl font-bold">You're Offline</h2>

        <p className="mt-2 text-base-content/60">
          Please check your internet connection and try again.
        </p>
      </div>
    </div>
  );
};

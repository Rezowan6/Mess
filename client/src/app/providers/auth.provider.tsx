import { useEffect, type ReactNode } from "react";

import { useMe } from "@/modules/auth/hooks/useMe";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { PageLoader } from "@/shared/components/feedback/PageLoader";
import { tokenStorage } from "@/shared/utils/token";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const token = tokenStorage.get();

  const setInitialized = useAuthStore((state) => state.setInitialized);

  const { isLoading } = useMe({
    enabled: !!token,
  });

  useEffect(() => {
    if (!isLoading) {
      setInitialized(true);
    }
  }, [isLoading]);

  const initialized = useAuthStore((state) => state.isInitialized);

  if (!initialized) {
    return <PageLoader />;
  }

  return children;
};

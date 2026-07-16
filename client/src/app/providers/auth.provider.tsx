import type { ReactNode } from "react";

import { useMe } from "@/modules/auth/hooks/useMe";
import { tokenStorage } from "@/shared/utils/token";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const token = tokenStorage.get();

  const { isLoading } = useMe({
    enabled: !!token,
  });

  if (token && isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return children;
};

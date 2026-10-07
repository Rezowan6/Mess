import type { ReactNode } from "react";

interface Props {
  title?: string;
  subtitle: string;
  children: ReactNode;
}

export const AuthCard = ({ title, subtitle, children }: Props) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-theme-background px-4">
      <div className="w-full max-w-md rounded-theme-md border border-theme-border bg-theme-card shadow-theme-lg">
        <div className="flex flex-col gap-2 p-8">
          <h1 className="text-center text-3xl font-bold text-theme-text">
            {title ? title : "Mess Management System"}
          </h1>

          <p className="text-center text-theme-text-secondary">{subtitle}</p>

          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

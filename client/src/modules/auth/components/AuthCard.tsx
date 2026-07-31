import type { ReactNode } from "react";

interface Props {
  title?: string;
  subtitle: string;
  children: ReactNode;
}

export const AuthCard = ({ title, subtitle, children }: Props) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-center text-3xl font-bold">
            {title ? title : "Mess Management System"}
          </h1>

          <p className="text-center text-base-content/70">{subtitle}</p>

          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

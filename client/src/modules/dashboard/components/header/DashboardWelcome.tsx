import { useAuthStore } from "@/modules/auth/store/auth.store";
import { Sparkles } from "lucide-react";

export const DashboardWelcome = () => {
  const member = useAuthStore((state) => state.user);
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <h1 className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
          Welcome back {member?.name}
        </h1>

        <Sparkles size={22} className="text-accent" strokeWidth={2} />
      </div>

      <p className="text-sm sm:text-base">
        Overview of your mess management activities.
      </p>
    </div>
  );
};

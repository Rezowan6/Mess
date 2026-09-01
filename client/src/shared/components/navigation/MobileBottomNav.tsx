import { CircleDollarSign, House, Users, Utensils } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: House,
  },
  {
    label: "Members",
    path: "/users",
    icon: Users,
  },
  {
    label: "Meals",
    path: "/preferences",
    icon: Utensils,
  },
  {
    label: "Expense",
    path: "/expenses",
    icon: CircleDollarSign,
  },
];

export const MobileBottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-base-300 lg:hidden">
      <div className="grid h-16 grid-cols-4">
        {navItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 text-xs transition-colors ${
                isActive ? "text-accent font-semibold" : "text-text"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={21} strokeWidth={isActive ? 2.5 : 2} />

                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

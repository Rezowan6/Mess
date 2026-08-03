import { Outlet } from "react-router-dom";

export const MyProfileLayout = () => {
  return (
    <div className="space-y-6">
      <Outlet />
    </div>
  );
};

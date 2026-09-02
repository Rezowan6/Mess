import { Link } from "react-router-dom";

import { useAuthStore } from "@/modules/auth/store/auth.store";
import { getAvatarInitial } from "@/shared/utils/getAvatarInitial";

import { ROUTES } from "@/shared/constants/routes";
import { Avatar } from "../../ui/Avatar";

export const HeaderProfile = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <Link
      to={ROUTES.MY_PROFILE}
      className="
        block
        rounded-full
        cursor-pointer
        transition-all
        duration-200
        hover:scale-105
      "
    >
      <Avatar
        src={user?.avatar}
        alt={user?.name ?? "Profile"}
        fallback={getAvatarInitial(user?.name ?? "")}
      />
    </Link>
  );
};

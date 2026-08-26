import { Avatar } from "@/shared/components/ui/Avatar";
import { getAvatarInitial } from "@/shared/utils/getAvatarInitial";

interface Props {
  member: {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
  };
}

export const MyProfileHeader = ({ member }: Props) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-info/10 p-5 shadow-sm sm:flex-row sm:items-center">
      <Avatar size="xl" fallback={getAvatarInitial(member.name)}></Avatar>
      <div>
        <h2 className="text-xl font-bold">{member.name}</h2>
        <p className="text-sm opacity-60">{member.email}</p>
      </div>
    </div>
  );
};

import { useUpdateAvatar } from "../hooks/useUpdateAvatar";
import { AvatarUploadButton } from "./AvatarUploadButton";

interface Props {
  member: {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
  };
}

export const MyProfileHeader = ({ member }: Props) => {
  const { mutate: updateAvatar, isPending } = useUpdateAvatar();

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-info/10 p-5 shadow-sm sm:flex-row sm:items-center">
      <AvatarUploadButton
        avatar={member.avatar}
        name={member.name}
        isPending={isPending}
        onUpload={updateAvatar}
      />

      <div>
        <h2 className="text-xl font-bold">{member.name}</h2>
        <p className="text-sm opacity-60">{member.email}</p>
      </div>
    </div>
  );
};

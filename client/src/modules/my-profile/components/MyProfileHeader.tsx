import { Avatar } from "@/shared/components/ui/Avatar";
import { getAvatarInitial } from "@/shared/utils/getAvatarInitial";
import { Camera } from "lucide-react";
import { useRef } from "react";
import { useUpdateAvatar } from "../hooks/useUpdateAvatar";

interface Props {
  member: {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
  };
}

export const MyProfileHeader = ({ member }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateAvatar, isPending } = useUpdateAvatar();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    updateAvatar(file);

    e.target.value = "";
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-info/10 p-5 shadow-sm sm:flex-row sm:items-center">
      <div className="relative">
        <Avatar
          src={member.avatar}
          alt={member.name}
          size="xl"
          fallback={getAvatarInitial(member.name)}
        />

        <button
          type="button"
          disabled={isPending}
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-md transition hover:bg-primary/80 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Camera size={14} />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div>
        <h2 className="text-xl font-bold">{member.name}</h2>
        <p className="text-sm opacity-60">{member.email}</p>
      </div>
    </div>
  );
};

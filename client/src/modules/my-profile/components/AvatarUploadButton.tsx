import { Avatar } from "@/shared/components/ui/Avatar";
import { getAvatarInitial } from "@/shared/utils/getAvatarInitial";
import { Camera } from "lucide-react";
import { useRef } from "react";

interface Props {
  avatar: string | null;
  name: string;
  isPending?: boolean;
  onUpload: (file: File) => void;
}

export const AvatarUploadButton = ({
  avatar,
  name,
  isPending = false,
  onUpload,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onUpload(file);
    e.target.value = "";
  };

  return (
    <div className="relative h-16 w-16 shrink-0">
      <Avatar
        src={avatar}
        alt={name}
        size="xl"
        fallback={getAvatarInitial(name)}
      />

      <button
        type="button"
        disabled={isPending}
        onClick={() => fileInputRef.current?.click()}
        className="absolute bottom-0 right-0 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-gradient-info text-white shadow-md transition hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-50"
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
  );
};

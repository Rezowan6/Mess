import { Avatar } from "@/shared/components/ui/Avatar";
import { getAvatarInitial } from "@/shared/utils/getAvatarInitial";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";
import { AvatarCropModal } from "./AvatarCropModal";

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

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setSelectedImage(imageUrl);
    setIsCropModalOpen(true);

    e.target.value = "";
  };

  const handleCropSave = (file: File) => {
    onUpload(file);

    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }

    setSelectedImage(null);
  };

  const handleCropClose = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }

    setSelectedImage(null);
    setIsCropModalOpen(false);
  };

  return (
    <>
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
          className="absolute bottom-0 right-0 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-theme-info text-theme-on-brand shadow-theme-sm transition hover:bg-theme-info/90 disabled:cursor-not-allowed disabled:opacity-50"
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

      <AvatarCropModal
        image={selectedImage}
        isOpen={isCropModalOpen}
        onClose={handleCropClose}
        onSave={handleCropSave}
      />
    </>
  );
};

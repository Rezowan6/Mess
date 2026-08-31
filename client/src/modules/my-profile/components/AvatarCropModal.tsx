import { useCallback, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";

import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import { createCroppedImage } from "@/shared/utils/image";

interface AvatarCropModalProps {
  image: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (file: File) => void;
}

export const AvatarCropModal = ({
  image,
  isOpen,
  onClose,
  onSave,
}: AvatarCropModalProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleSave = async () => {
    if (!image || !croppedAreaPixels) return;

    try {
      setIsSaving(true);

      const file = await createCroppedImage(
        image,
        croppedAreaPixels,
        "avatar.jpg",
      );

      onSave(file);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  if (!image) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adjust Profile Photo">
      <div className="space-y-5">
        <div className="relative h-80 w-full overflow-hidden rounded-lg bg-background">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm mr-1 font-medium">Zoom</label>

          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(event) => setZoom(Number(event.target.value))}
            className="range range-success"
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="error"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="success"
            loading={isSaving}
            loadingText="Preparing..."
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

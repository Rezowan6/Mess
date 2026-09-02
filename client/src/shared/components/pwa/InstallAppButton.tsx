import { Download, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

export const InstallAppButton = () => {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();

      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt,
    );

    window.addEventListener("appinstalled", handleAppInstalled);

    // Check if already running as installed PWA
    const standalone = window.matchMedia(
      "(display-mode: standalone)",
    ).matches;

    if (standalone) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );

      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();

    const { outcome } = await installPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }

    setInstallPrompt(null);
  };

  if (isInstalled || !installPrompt) {
    return null;
  }

  return (
    <Button
      type="button"
      onClick={handleInstall}
    >
      <Smartphone size={18} />
      <span>Install App</span>
      <Download size={16} />
    </Button>
  );
};
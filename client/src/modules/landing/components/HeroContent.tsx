import { InstallAppButton } from "@/shared/components/pwa/InstallAppButton";
import { HeroActions } from "./HeroActions";
import { HeroHeader } from "./HeroHeader";
import { HeroHighlights } from "./HeroHighlights";

export const HeroContent = () => {
  return (
    <div className="space-y-8">
      <HeroHeader />

      <HeroActions />

      <InstallAppButton />

      <HeroHighlights />
    </div>
  );
};

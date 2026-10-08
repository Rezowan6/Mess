import { InstallAppButton } from "@/shared/components/pwa/InstallAppButton";
import { HeroHeader } from "./HeroHeader";
import { HeroHighlights } from "./HeroHighlights";
import { HeroActions } from "./HeroActions";

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

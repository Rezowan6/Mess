import { Badge } from "@/shared/components/ui/Badge";
import { TypingText } from "@/shared/components/ui/TypingText";
import { heroConfig } from "../../configs/hero.config";

export const HeroHeader = () => {
  return (
    <>
      <Badge variant="primary">{heroConfig.badge}</Badge>

      <h1 className="text-3xl sm:text-4xl text-theme-text font-bold leading-tight">
        {heroConfig.title}

        <TypingText
          texts={heroConfig.highlightedTitles}
          className="block text-2xl sm:text-4xl font-bold"
          textClassName="text-theme-brand"
          backDelay={1000}
          smartBackspace={false}
        />
      </h1>

      <p className="max-w-xl text-lg text-theme-text-muted">
        {heroConfig.description}
      </p>
    </>
  );
};

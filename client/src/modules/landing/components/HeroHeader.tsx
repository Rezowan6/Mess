import { Badge } from "@/shared/components/ui/Badge";
import { TypingText } from "@/shared/components/ui/TypingText";
import { heroConfig } from "../configs/hero.config";

export const HeroHeader = () => {
  return (
    <>
      <Badge variant="success">{heroConfig.badge}</Badge>

      <h1 className="text-4xl font-bold leading-tight">
        {heroConfig.title}

        <TypingText
          texts={heroConfig.highlightedTitles}
          className="block text-4xl font-bold"
          textClassName="text-accent"
          backDelay={1000}
          smartBackspace={false}
        />
      </h1>

      <p className="max-w-xl text-lg text-base-content/70">
        {heroConfig.description}
      </p>
    </>
  );
};

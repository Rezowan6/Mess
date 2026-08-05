import { heroConfig } from "../configs/hero.config";

export const HeroHeader = () => {
  return (
    <>
      <div className="badge badge-primary badge-outline px-4 py-3 text-sm">
        {heroConfig.badge}
      </div>

      <h1 className="text-4xl font-bold leading-tight md:text-6xl">
        {heroConfig.title}

        <span className="block text-primary">
          {heroConfig.highlightedTitle}
        </span>
      </h1>

      <p className="max-w-xl text-lg text-base-content/70">
        {heroConfig.description}
      </p>
    </>
  );
};

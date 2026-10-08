import { heroHighlights } from "../../configs/hero-highlights.config";

export const HeroHighlights = () => {
  return (
    <div className="grid gap-3 pt-4 sm:grid-cols-2">
      {heroHighlights.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <span className="text-theme-success">{item.icon}</span>
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
};

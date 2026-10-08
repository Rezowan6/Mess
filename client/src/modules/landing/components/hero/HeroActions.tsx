import { Link } from "react-router-dom";

import { Button } from "@/shared/components/ui/Button";

import { heroConfig } from "../../configs/hero.config";

export const HeroActions = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {heroConfig.actions.map((action) => (
        <Link key={action.to} to={action.to}>
          <Button variant={action.variant}>{action.label}</Button>
        </Link>
      ))}
    </div>
  );
};

import { Link } from "react-router-dom";

import { landingNavLinks } from "../configs/landingNavLinks.config";
import { HeroActions } from "./HeroActions";

export const LandingNavbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-primary">
          Mess Management
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {landingNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <HeroActions />
      </div>
    </header>
  );
};

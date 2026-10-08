import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { landingNavLinks } from "../../configs/landingNavLinks.config";
import { HeroActions } from "../hero/HeroActions";

const linkClass =
  "text-sm text-theme-text-secondary transition-colors duration-200 hover:text-theme-brand";

interface NavLinksProps {
  className?: string;
  onLinkClick?: () => void;
}

const NavLinks = ({ className, onLinkClick }: NavLinksProps) => (
  <nav className={className}>
    {landingNavLinks.map((link) => (
      <a
        key={link.href}
        href={link.href}
        onClick={onLinkClick}
        className={linkClass}
      >
        {link.label}
      </a>
    ))}
  </nav>
);

export const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-theme-border bg-theme-header backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <a href="#home" className="text-xl font-bold text-theme-brand">
          Mess Management
        </a>

        {/* Desktop Navigation */}
        <NavLinks className="hidden items-center gap-8 md:flex" />

        {/* Desktop Actions */}
        <div className="hidden md:block">
          <HeroActions />
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="cursor-pointer text-theme-text md:hidden"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      <div
        onClick={closeMenu}
        aria-hidden="true"
        className={clsx(
          "fixed inset-x-0 bottom-0 top-16 bg-theme-overlay transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Mobile Drawer */}
      <div
        className={clsx(
          "fixed bottom-0 left-0 top-16 w-72",
          "transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0 " : "-translate-x-full",
        )}
      >
        <div className="h-screen flex flex-col gap-6 p-6 bg-theme-header">
          <NavLinks className="flex flex-col gap-6" onLinkClick={closeMenu} />

          <div className="mt-4">
            <HeroActions />
          </div>
        </div>
      </div>
    </header>
  );
};

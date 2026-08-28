import { Menu, X } from "lucide-react";
import { useState } from "react";
import { landingNavLinks } from "../configs/landingNavLinks.config";
import { HeroActions } from "./HeroActions";

export const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <a href="#home" className="text-xl font-bold text-accent">
          Mess Management
        </a>

        {/* Desktop Navigation */}
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

        {/* Desktop Actions */}
        <div className="hidden md:block">
          <HeroActions />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer md:hidden"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed left-0 top-16  h-[calc(100vh-4rem)] w-72 bg-base-100 shadow-xl transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav className="flex flex-col gap-6 p-6">
          {landingNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm hover:text-primary"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-4">
            <HeroActions />
          </div>
        </nav>
      </div>
    </header>
  );
};

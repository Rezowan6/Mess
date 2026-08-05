import { FooterBrand } from "./FooterBrand";
import { FooterLinks } from "./FooterLinks";
import { FooterSocialLinks } from "./FooterSocialLinks";

export const Footer = () => {
  return (
    <footer className="border-t border-base-300 bg-base-100 px-6 py-10">
      <div className="container mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <FooterBrand />

          {/* Links */}
          <FooterLinks />

          {/* Social */}
          <FooterSocialLinks />
        </div>

        <div className="mt-8 border-t border-base-300 pt-6 text-center text-sm text-base-content/60">
          © {new Date().getFullYear()} Mess Management System. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

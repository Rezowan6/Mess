const quickLinks = ["Features", "Pricing", "FAQ", "Contact"] as const;

const headingClass =
  "mb-4 text-sm font-semibold uppercase tracking-wide text-theme-text";

const linkClass =
  "cursor-pointer transition-colors duration-200 hover:text-theme-brand";

export const FooterLinks = () => {
  return (
    <div>
      <h4 className={headingClass}>Quick Links</h4>

      <ul className="space-y-2.5 text-sm text-theme-text-muted">
        {quickLinks.map((link) => (
          <li key={link} className={linkClass}>
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
};

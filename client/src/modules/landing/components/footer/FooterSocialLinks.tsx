import { Mail } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const iconClass =
  "size-5 text-theme-text-muted transition-colors duration-200 hover:text-theme-brand";

export const FooterSocialLinks = () => {
  return (
    <div className="flex gap-3">
      <FaFacebook className={iconClass} />

      <FaGithub className={iconClass} />

      <FaLinkedin className={iconClass} />

      <Mail className={iconClass} />
    </div>
  );
};

import { Mail } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

export const FooterSocialLinks = () => {
  return (
    <div className="flex gap-3">
      <button className="btn btn-circle btn-outline">
        <FaFacebook size={18} />
      </button>

      <button className="btn btn-circle btn-outline">
        <FaGithub size={18} />
      </button>

      <button className="btn btn-circle btn-outline">
        <FaLinkedin size={18} />
      </button>

      <button className="btn btn-circle btn-outline">
        <Mail size={18} />
      </button>
    </div>
  );
};

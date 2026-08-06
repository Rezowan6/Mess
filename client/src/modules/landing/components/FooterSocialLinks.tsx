import { Button } from "@/shared/components/ui/Button";
import { Mail } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

export const FooterSocialLinks = () => {
  return (
    <div className="flex gap-3">
      <Button variant="success">
        <FaFacebook size={18} />
      </Button>

      <Button variant="primary">
        <FaGithub size={18} />
      </Button>

      <Button variant="warning">
        <FaLinkedin size={18} />
      </Button>

      <Button variant="accent">
        <Mail size={18} />
      </Button>
    </div>
  );
};

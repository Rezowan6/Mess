import { Button } from "@/shared/components/ui/Button";
import { Mail } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

export const FooterSocialLinks = () => {
  return (
    <div className="flex gap-3">
      <Button variant="success">
        <FaFacebook/>
      </Button>

      <Button variant="primary">
        <FaGithub />
      </Button>

      <Button variant="warning">
        <FaLinkedin  />
      </Button>

      <Button variant="accent">
        <Mail  />
      </Button>
    </div>
  );
};

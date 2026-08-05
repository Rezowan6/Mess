import { Mail } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="border-t border-base-300 bg-base-100 px-6 py-10">
      <div className="container mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-primary">Mess Management</h3>

            <p className="mt-3 text-sm text-base-content/70">
              A complete SaaS platform to manage meals, members, deposits,
              expenses, and monthly calculations easily.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-3 font-semibold">Quick Links</h4>

            <ul className="space-y-2 text-sm text-base-content/70">
              <li>Features</li>

              <li>Pricing</li>

              <li>FAQ</li>

              <li>Contact</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-3 font-semibold">Follow Us</h4>

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
          </div>
        </div>

        <div className="mt-8 border-t border-base-300 pt-6 text-center text-sm text-base-content/60">
          © {new Date().getFullYear()} Mess Management System. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

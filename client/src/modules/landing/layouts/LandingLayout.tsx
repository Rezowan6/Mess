import { Outlet } from "react-router-dom";

import { Footer } from "../components/Footer";
import { LandingNavbar } from "../components/LandingNavbar";

export const LandingLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

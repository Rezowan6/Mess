import { Outlet } from "react-router-dom";

import { LandingNavbar } from "../components/navbar/LandingNavbar";
import { Footer } from "../components/footer/Footer";

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

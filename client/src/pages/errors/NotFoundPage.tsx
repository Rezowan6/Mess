import { Button } from "@/shared/components/ui/Button";
import { Link, useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="text-center max-w-xl">
        {/* Error Code */}
        <h1 className="text-7xl font-bold text-gray-800 mb-4">404</h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          Oops! Page not found
        </h2>

        {/* Description */}
        <p className="text-gray-500 mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          {/* Go Home */}
          <Link to="/">
            <Button>Go Home</Button>
          </Link>

          {/* Go Back */}
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

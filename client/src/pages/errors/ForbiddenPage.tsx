import { Button } from "@/shared/components/ui/Button";
import { ROUTES } from "@/shared/constants/routes";
import { Link, useNavigate } from "react-router-dom";

export const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="text-center max-w-xl">
        <h1 className="text-7xl font-bold text-gray-800 mb-4">403</h1>

        <h2 className="text-2xl font-semibold text-gray-700 mb-3">
          Access denied
        </h2>

        <p className="text-gray-500 mb-8">
          You do not have permission to view this page. If you think this is a
          mistake, try a different account or go back.
        </p>

        <div className="flex justify-center gap-4">
          <Link to={ROUTES.DASHBOARD}>
            <Button>Go to Dashboard</Button>
          </Link>

          <Button variant="secondary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

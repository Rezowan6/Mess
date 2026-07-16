import { Link } from "react-router-dom";

export const NotFoundPage = () => {
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
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl 
                       hover:bg-blue-700 transition duration-200"
          >
            Go Home
          </Link>

          {/* Go Back */}
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-gray-300 
                       text-gray-700 rounded-xl 
                       hover:bg-gray-200 transition duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};
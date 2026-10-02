import { isAxiosError } from "axios";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/shared/components/ui/Button";
import { ROUTES } from "@/shared/constants/routes";
import { AuthCard } from "../components/AuthCard";
import { useVerifyEmail } from "../hooks/useVerifyEmail";

const getErrorMessage = (error: unknown): string => {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? "Email verification failed.";
  }

  return "Something went wrong. Please try again.";
};

export const VerifyEmailPage = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, isError, error } = useVerifyEmail();

  // Stores the last token we sent, so StrictMode's double effect run
  // does not call the API twice, while a new token still gets verified
  const requestedToken = useRef<string | null>(null);

  useEffect(() => {
    if (!token || requestedToken.current === token) return;

    requestedToken.current = token;
    mutate(token);
  }, [token, mutate]);

  const isInvalidLink = !token;

  const goToLogin = () => navigate(ROUTES.LOGIN);

  const handleRetry = () => {
    if (!token) return;

    mutate(token);
  };

  if (isSuccess) {
    return (
      <AuthCard
        title="Email Verified"
        subtitle="Your email has been verified successfully"
      >
        <div className="space-y-4 text-center">
          <p className="text-success">You can now log in to your account.</p>
          <Button onClick={goToLogin}>Go to Login</Button>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Verifying Your Email" subtitle="Please wait a moment">
      {isError || isInvalidLink ? (
        <div className="space-y-4">
          <div role="alert" className="alert alert-error alert-soft">
            <span>
              {isInvalidLink
                ? "This verification link is invalid."
                : getErrorMessage(error)}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {!isInvalidLink && (
              <Button onClick={handleRetry} disabled={isPending}>
                Retry
              </Button>
            )}
            <Button onClick={goToLogin}>Back to Login</Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center py-4">
          <span className="loading loading-spinner loading-lg text-info" />
        </div>
      )}
    </AuthCard>
  );
};

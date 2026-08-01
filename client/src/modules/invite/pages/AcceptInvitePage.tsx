import { AuthCard } from "@/modules/auth/components/AuthCard";
import { AcceptInviteForm } from "../components/AcceptInviteForm";

export const AcceptInvitePage = () => {
  return (
    <AuthCard title="Accept Invitation" subtitle="Complete your account setup">
      <AcceptInviteForm />
    </AuthCard>
  );
};

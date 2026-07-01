import { sendEmail } from "@/utils/sendEmail.js";

export const sendInviteEmail = async (
  email: string,
  inviteLink: string,
  name?: string,
) => {
  const html = `
    <div style="font-family: Arial, sans-serif;">
      <h2>You are invited to join ${name ?? "Mess Management System"}</h2>

      <p>
        An admin has invited you to join the system.
      </p>

      <p>
        Click the button below to set your password and activate your account:
      </p>

      <a 
        href="${inviteLink}" 
        target="_blank"
        style="
          display:inline-block;
          padding:12px 20px;
          background:#2563eb;
          color:white;
          text-decoration:none;
          border-radius:6px;
        "
      >
        Accept Invitation
      </a>

      <p>
        If you did not expect this invitation, you can ignore this email.
      </p>

      <br />

      <p>
        Thanks,<br/>
        Mess Management System
      </p>
    </div>
  `;

  return await sendEmail(
    email,
    "You are invited to join Mess Management System",
    html,
  );
};

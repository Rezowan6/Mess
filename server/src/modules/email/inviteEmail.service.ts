import { env } from "@/configs/index.js";
import { sendEmail } from "@/utils/sendEmail.js";
import { SendInviteEmailPayload } from "../invite/invite.interface.js";

export const sendInviteEmail = async (payload: SendInviteEmailPayload) => {
  
  const { recipientName, token, name, email, inviterName } = payload;
  const inviteLink = `${env.FRONTEND_URL}/accept-invite/${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif;">
      <h2>You are invited to join ${name ?? "Mess Management System"}</h2>

      <p>
        An ${inviterName} has invited you to join the system.
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
        Thanks, ${recipientName}
      </p>
    </div>
  `;

  return await sendEmail(
    email,
    `You are invited to join ${name}`,
    html,
  );
};

import * as MembershipRepository from "../membership/membership.repository.js";
import * as UserRepository from "../user/user.repository.js";
import * as IDep from "./index.js";
import { ApiError } from "./index.js";
import { SendInvitePayload } from "./invite.interface.js";
import * as InviteRepository from "./invite.repository.js";

export const send = async (payload: SendInvitePayload) => {
  const { user, membership, tenant } = payload.context;

  const email = payload.email.trim().toLocaleLowerCase();

  // User already exists?
  const existingUser = await UserRepository.findByEmail(email);

  if (existingUser) {
    const existingMembership = await MembershipRepository.findByTenantAndUser(
      membership.tenantId,
      existingUser.id,
    );

    if (existingMembership) {
      throw new ApiError(409, "User already belongs to this tenant.");
    }
  }

  // Pending invite?
  const pendingInvite = await InviteRepository.findPendingByEmailAndTenant(
    email,
    membership.tenantId,
  );

  if (pendingInvite) {
    throw new ApiError(409, "Pending invite already exists.");
  }

  // Generate token
  const { rawToken, tokenHash } = IDep.generateInviteToken();
  const expiresAt = IDep.generateInviteExpiry();

  const invite = await IDep.sequelize.transaction(async (transaction) => {
    const newInvite = await InviteRepository.create(
      {
        email,
        tokenHash,
        expiresAt,
        tenantId: membership.tenantId,
        createdBy: user.id,
      },
      transaction,
    );

    return newInvite;
  });

  await IDep.sendInviteEmail({
    email,
    recipientName: existingUser?.name ?? "Member",
    messName: tenant?.name,
    inviterName: user?.name ?? "Admin",
    token: rawToken,
  });

  return {
    message: "Invite send successfully",
    invite,
  };
};

// export const validate = async (token: any) => {
//   const tokenHash = hashToken(token);

//   const invite = await Invite.findOne({
//     where: {
//       tokenHash,
//       status: InviteStatus.PENDING,
//     },
//   });

//   if (!invite) {
//     throw new ApiError(404, "Invalid invite");
//   }

//   if (invite.expiresAt < new Date()) {
//     throw new ApiError(404, "Invite expired");
//   }

//   if (invite.usedCount >= invite.maxUses) {
//     throw new ApiError(404, "Invite already used");
//   }

//   return {
//     message: "Accept invite",
//     invite,
//   };
// };

// export const accept = async (token: any, password: string) => {
//   const { invite, message } = await validate(token);

//   const hashedPassword = await hashPassword(password);

//   let result: any;

//   await sequelize.transaction(async (transaction: any) => {
//     const user = await createUser(
//       {
//         email: invite.email,
//         password: hashedPassword,
//         role: invite.role,
//         tenantId: invite.tenantId,
//       },
//       transaction,
//     );

//     await invite.update({
//       status: InviteStatus.ACCEPTED,
//       usedCount: invite.usedCount + 1,
//       acceptedAt: new Date(),
//     });

//     result = {
//       user,
//     };
//   });

//   return {
//     message,
//     user: result?.user,
//   };
// };

// export const cancel = async (inviteId: number, tenantId: number) => {
//   const invite = await Invite.findOne({
//     where: {
//       id: inviteId,
//       tenantId,
//     },
//   });

//   if (!invite) {
//     throw new ApiError(404, "Invite not found");
//   }

//   if (invite.status === InviteStatus.ACCEPTED) {
//     throw new ApiError(400, "Accepted invite cannot be cancelled");
//   }

//   if (invite.status === InviteStatus.REVOKED) {
//     throw new ApiError(400, "Invite already cancelled");
//   }

//   await invite.update({
//     status: InviteStatus.REVOKED,
//     revokedAt: new Date(),
//   });

//   return {
//     message: "Invite cancelled successfully",
//   };
// };

// export const resend = async (inviteId: number, tenantId: number) => {
//   const invite = await Invite.findOne({ where: { id: inviteId, tenantId } });

//   if (!invite) {
//     throw new ApiError(404, "Invite not found");
//   }

//   if (invite.status === InviteStatus.ACCEPTED) {
//     throw new ApiError(409, "Invite has already been accepted");
//   }

//   if (invite.status === InviteStatus.REVOKED) {
//     throw new ApiError(409, "Cancelled invite cannot be resent");
//   }
//   const tenant = await Tenant.findOne({ where: { ownerId: tenantId } });

//   const { rawToken, tokenHash } = generateInviteToken();

//   const expiresAt = generateInviteExpiry();

//   await invite.update({
//     tokenHash,
//     expiresAt,
//     status: InviteStatus.PENDING,
//   });
//   await sendInviteEmail(
//     invite.email,
//     `${env.FRONTEND_URL}/accept-invite/${rawToken}`,
//     tenant?.name ?? "",
//   );
//   return {
//     message: "Invite resent successfully",
//   };
// };

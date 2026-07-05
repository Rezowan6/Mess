import { InviteStatus, MemberRole, MemberStatus } from "@/constans/index.js";
import * as MembershipRepository from "../membership/membership.repository.js";
import * as UserRepository from "../user/user.repository.js";
import * as IDep from "./index.js";
import { ApiError } from "./index.js";
import { AcceptInvitePayload, SendInvitePayload } from "./invite.interface.js";
import { InviteRepository } from "./invite.repository.js";

/**
 * 
 * @param payload Step 10 — আজকের Implementation Order

আমি আগের মতো ধাপে ধাপে এগোতে চাই:

Lesson 1 (আজ শুরু)

✅ inviteService.validate()

Repository call
Token check
Invite exists
Status check
Expiry check
Return invite
Lesson 2

✅ inviteService.accept()

validate() reuse
User check
Password hash
Transaction
Lesson 3

✅ Membership create

Lesson 4

✅ Update invite status

Lesson 5

✅ Edge cases

Token reused
User already active
Tenant inactive
Membership exists
Rollback scenarios
 * @returns 
 */

export const send = async (payload: SendInvitePayload) => {
  const { user, membership, tenant } = payload.context;

  const email = payload.email.trim().toLocaleLowerCase();

  // User already exists?
  const existingUser = await UserRepository.findByEmail(email);

  if (existingUser) {
    const existingMembership = await MembershipRepository.findByTenantAndUser({
      tenantId: membership.tenantId,
      userId: existingUser.id,
    });

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

export const validate = async (token: string) => {
  const hashToken = IDep.hashToken(token);

  // 2. Find invite
  const invite = await InviteRepository.findByToken(token);

  if (!invite) {
    throw new ApiError(404, "Invalid invite token.");
  }

  // 3. Status validation
  switch (invite.status) {
    case InviteStatus.ACCEPTED:
      throw new ApiError(400, "This invitation has already been accepted.");

    case InviteStatus.CANCELLED:
      throw new ApiError(400, "This invitation has been cancelled.");

    case InviteStatus.EXPIRED:
      throw new ApiError(400, "This invitation has expired.");
  }

  // 4. Expiry validation
  if (invite.expiresAt && invite.expiresAt.getTime() < Date.now()) {
    await InviteRepository.update(invite, {
      status: InviteStatus.EXPIRED,
    });

    throw new ApiError(400, "This invitation has expired.");
  }

  // 5. Success
  return {
    invite,
    message: "Invitation is valid.",
  };
};

export const accept = async (payload: AcceptInvitePayload) => {
  const { name, password, token } = payload;

  return IDep.sequelize.transaction(async (transaction) => {
    const { invite } = await validate(token);

    let user = await UserRepository.findByEmail(invite.email, transaction);

    if (!user) {
      user = await UserRepository.createUser(
        {
          email: invite.email,
          name,
          password,
          isVerified: true,
        },
        transaction,
      );
    } else if (!user.password) {
      await UserRepository.update(
        user,
        {
          name,
          password,
          isVerified: true,
        },
        transaction,
      );
    }
    // Check membership
    const membership = await MembershipRepository.findByTenantAndUser(
      {
        tenantId: invite.tenantId,
        userId: user.id,
      },
      transaction,
    );

    if (membership) {
      throw new ApiError(400, "User is already a member of this mess.");
    }

    // Create membership
    await MembershipRepository.create(
      {
        tenantId: invite.tenantId,
        userId: user.id,
        role: MemberRole.MEMBER,
        status: MemberStatus.ACTIVE,
        invitedBy: invite.createdBy,
        joinedAt: new Date(),
      },
      transaction,
    );

    // Update invite
    await InviteRepository.update(
      invite,
      {
        status: InviteStatus.ACCEPTED,
        acceptedAt: new Date(),
      },
      transaction,
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
      },
      message: "Invitation accepted successfully.",
    };
  });
};

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

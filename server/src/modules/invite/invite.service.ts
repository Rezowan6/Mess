import { InviteStatus, MemberRole, MemberStatus } from "@/constans/index.js";
import { tenantRepository } from "../tenant/tenant.repository.js";
import { membershipRepository } from "../tenantMembership/tenantMembership.repository.js";
import { userRepository } from "../user/user.repository.js";
import * as IDep from "./index.js";
import { ApiError } from "./index.js";
import {
  IAcceptInvitePayload,
  ICancelPayload,
  ISendInvitePayload,
} from "./invite.interface.js";
import { inviteRepository } from "./invite.repository.js";

class InviteService {
  async send({ email, context }: ISendInvitePayload) {
    const { tenantId, userId } = context;

    // User already exists?
    const existingUser = await userRepository.findOne({ email });

    const inviter = await userRepository.findById(userId);

    const tenant = await tenantRepository.findById(tenantId);

    if (existingUser) {
      const existingMembership = await inviteRepository.findOne({
        tenantId,
        email,
      });

      if (existingMembership) {
        throw new ApiError(409, "User already belongs to this tenant.");
      }
    }

    // Pending invite?
    const pendingInvite = await inviteRepository.findOne({
      email,
      tenantId,
      status: InviteStatus.PENDING,
    });

    if (pendingInvite) {
      throw new ApiError(409, "Pending invite already exists.");
    }

    // Generate token
    const { rawToken, tokenHash } = IDep.generateInviteToken();
    const expiresAt = IDep.generateInviteExpiry();

    const invite = await IDep.sequelize.transaction(async (transaction) => {
      return await inviteRepository.createWithOptions(
        {
          email,
          tokenHash,
          expiresAt,
          tenantId,
          createdBy: userId,
          status: InviteStatus.PENDING,
        },
        { transaction },
      );
    });

    await IDep.sendInviteEmail({
      email,
      recipientName: existingUser?.name ?? "Member",
      name: tenant?.name as string,
      inviterName: inviter?.name ?? "Admin",
      token: rawToken,
    });

    return invite;
  }

  async validate(token: string) {
    const tokenHash = IDep.hashToken(token);

    // 2. Find invite
    const invite = await inviteRepository.findOne({ tokenHash });

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
      await inviteRepository.update(
        {
          status: InviteStatus.EXPIRED,
        },
        invite,
      );

      throw new ApiError(400, "This invitation has expired.");
    }

    // 5. Success
    return {
      invite,
      message: "Invitation is valid.",
    };
  }

  async accept(payload: IAcceptInvitePayload) {
    const { name, password, token, } = payload;

    return IDep.sequelize.transaction(async (transaction) => {
      const { invite } = await this.validate(token);

      let user = await userRepository.findOne({ email: invite.email });

      if (!user) {
        user = await userRepository.createWithOptions(
          {
            email: invite.email,
            name,
            password,
            isVerified: true,
          },
          { transaction },
        );
      } else if (!user.password) {
        await userRepository.update(
          { email: invite.email },
          {
            name,
            password,
            isVerified: true,
          },
          { transaction },
        );
      }
      // Check membership
      const membership = await membershipRepository.findByActiveUser(
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
      await membershipRepository.createWithOptions(
        {
          tenantId: invite.tenantId,
          userId: user.id,
          role: MemberRole.MEMBER,
          status: MemberStatus.ACTIVE,
          invitedBy: invite.createdBy,
          joinedAt: new Date(),
        },
        { transaction },
      );

      // Update invite
      await inviteRepository.update(
        { id: invite.id },
        {
          status: InviteStatus.ACCEPTED,
          acceptedAt: new Date(),
          usedCount: 1,
        },
        { transaction },
      );

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
      };
    });
  }

  async cancel({ id, tenantId, userId }: ICancelPayload) {
    const invite = await inviteRepository.findOne({
      tenantId,
      id,
    });

    if (!invite) {
      throw new ApiError(404, "Invite not found");
    }

    switch (invite.status) {
      case InviteStatus.ACCEPTED:
        throw new ApiError(400, "Accepted invite cannot be cancelled");
      case InviteStatus.CANCELLED:
        throw new ApiError(400, "Invite already cancelled");
      case InviteStatus.REVOKED:
        throw new ApiError(400, "Rejected invite cannot be cancelled");
    }

    if (invite.createdBy !== userId) {
      throw new ApiError(403, "You are not allowed to cancel this invite");
    }

    invite.status = InviteStatus.CANCELLED;

    return null;
  }
}

export const inviteService = new InviteService();

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

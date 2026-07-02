import {
  ApiError,
  createUser,
  env,
  findUserByEmail,
  generateInviteExpiry,
  generateInviteToken,
  hashPassword,
  hashToken,
  Invite,
  InviteStatus,
  sendInvite,
  sendInviteEmail,
  sequelize,
  Tenant,
} from "./index.js";
import { CreateInvitePayload } from "./invite.validation.js";


export const invite = async (
  payload: CreateInvitePayload & {
    tenantId: number;
    createdBy: number;
  },
) => {
  const { email, role, message, maxUses, tenantId, createdBy } = payload;

  const user = await findUserByEmail(email);

  if (user) {
    throw new Error("User already exists for this email");
  }

  const existingInvite = await Invite.findOne({
    where: {
      email,
      tenantId,
      status: InviteStatus.PENDING,
    },
  });

  const tenant = await Tenant.findOne({
    where: { ownerId: tenantId, id: tenantId },
  });

  if (existingInvite) {
    throw new Error("Invite already exists for this email");
  }

  const { rawToken, tokenHash } = generateInviteToken();

  const expiresAt = generateInviteExpiry();

  const invite = await Invite.create({
    email,
    role,
    message: message ?? null,
    maxUses: maxUses ?? 1,

    tenantId,
    createdBy,
    tokenHash,

    status: InviteStatus.PENDING,
    expiresAt,
    usedCount: 0,
  });

  await sendInvite(email, tenant?.name ?? "", rawToken);

  return {
    message: "Invite created successfully",
    data: {
      invite,
      rawToken,
    },
  };
};

export const validate = async (token: any) => {
  const tokenHash = hashToken(token);

  const invite = await Invite.findOne({
    where: {
      tokenHash,
      status: InviteStatus.PENDING,
    },
  });

  if (!invite) {
    throw new ApiError(404, "Invalid invite");
  }

  if (invite.expiresAt < new Date()) {
    throw new ApiError(404, "Invite expired");
  }

  if (invite.usedCount >= invite.maxUses) {
    throw new ApiError(404, "Invite already used");
  }

  return {
    message: "Accept invite",
    invite,
  };
};

export const accept = async (token: any, password: string) => {
  const { invite, message } = await validate(token);

  const hashedPassword = await hashPassword(password);

  let result: any;

  await sequelize.transaction(async (transaction: any) => {
    const user = await createUser(
      {
        email: invite.email,
        password: hashedPassword,
        role: invite.role,
        tenantId: invite.tenantId,
      },
      transaction,
    );

    await invite.update({
      status: InviteStatus.ACCEPTED,
      usedCount: invite.usedCount + 1,
      acceptedAt: new Date(),
    });

    result = {
      user,
    };
  });

  return {
    message,
    user: result?.user,
  };
};

export const cancel = async (inviteId: number, tenantId: number) => {
  const invite = await Invite.findOne({
    where: {
      id: inviteId,
      tenantId,
    },
  });

  if (!invite) {
    throw new ApiError(404, "Invite not found");
  }

  if (invite.status === InviteStatus.ACCEPTED) {
    throw new ApiError(400, "Accepted invite cannot be cancelled");
  }

  if (invite.status === InviteStatus.REVOKED) {
    throw new ApiError(400, "Invite already cancelled");
  }

  await invite.update({
    status: InviteStatus.REVOKED,
    revokedAt: new Date(),
  });

  return {
    message: "Invite cancelled successfully",
  };
};

export const resend = async (inviteId: number, tenantId: number) => {
  const invite = await Invite.findOne({ where: { id: inviteId, tenantId } });

  if (!invite) {
    throw new ApiError(404, "Invite not found");
  }

  if (invite.status === InviteStatus.ACCEPTED) {
    throw new ApiError(409, "Invite has already been accepted");
  }

  if (invite.status === InviteStatus.REVOKED) {
    throw new ApiError(409, "Cancelled invite cannot be resent");
  }
  const tenant = await Tenant.findOne({ where: { ownerId: tenantId } });

  const { rawToken, tokenHash } = generateInviteToken();

  const expiresAt = generateInviteExpiry();

  await invite.update({
    tokenHash,
    expiresAt,
    status: InviteStatus.PENDING,
  });
  await sendInviteEmail(
    invite.email,
    `${env.FRONTEND_URL}/accept-invite/${rawToken}`,
    tenant?.name ?? "",
  );
  return {
    message: "Invite resent successfully",
  };
};

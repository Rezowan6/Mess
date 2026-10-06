import { MemberRole } from "@/constans/index.js";
import { Notification } from "@/modules/notification/notification.interface.js";
import { notificationService } from "@/modules/notification/notification.service.js";
import {
  RealtimeAction,
  RealtimeResource,
} from "@/socket/realtime.constant.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { socketService } from "@/socket/socket.service.js";
import { IPaginationQuery } from "@/types/pagination.interface.js";
import { ApiError } from "@/utils/ApiError.js";
import { logger } from "@/utils/logger.js";
import {
  IDeleteMemberPayload,
  IManageableTargetParams,
  IUpdateRolePayload,
  MAX_MANAGERS_PER_TENANT,
  MEMBER_MANAGEMENT_MESSAGES,
  MEMBER_MANAGER_ROLES,
  MemberShipRole,
} from "./tenantMembership.interface.js";
import { membershipRepository } from "./tenantMembership.repository.js";
import sequelize from "@/configs/db.js";
import { tenantRepository } from "../tenant/tenant.repository.js";

export class TenantMembershipService {
  async getMembers(tenantId: number, query: IPaginationQuery) {
    const members = await membershipRepository.findOne({ tenantId });

    if (!members) {
      throw new ApiError(404, "Member not found.");
    }
    const result = await membershipRepository.getMembers(tenantId, query);

    return result;
  }
  async getAllMembers(tenantId: number, search?: string) {
    const members = await membershipRepository.getAllMembers(tenantId, search);

    if (!members.length) {
      throw new ApiError(404, "Members not found.");
    }

    return members;
  }

  private async getManageableTargetMember(params: IManageableTargetParams) {
    const { tenantId, currentMembershipId, targetMembershipId, action } =
      params;
    const messages = MEMBER_MANAGEMENT_MESSAGES[action];

    const [currentMember, targetMember] = await Promise.all([
      membershipRepository.findById(currentMembershipId),
      membershipRepository.findById(targetMembershipId),
    ]);

    if (
      !currentMember ||
      currentMember.tenantId !== tenantId ||
      !MEMBER_MANAGER_ROLES.includes(currentMember.role as MemberShipRole)
    ) {
      throw new ApiError(403, messages.forbidden);
    }

    if (!targetMember || targetMember.tenantId !== tenantId) {
      throw new ApiError(404, "Member not found.");
    }

    if (targetMember.id === currentMember.id) {
      throw new ApiError(400, messages.self);
    }

    if (targetMember.role === MemberRole.ADMIN) {
      throw new ApiError(403, messages.admin);
    }

    return targetMember;
  }

  async updateRole(payload: IUpdateRolePayload) {
    const {
      tenantId,
      mealSessionId,
      currentMembershipId,
      id,
      role,
      userId: adminId,
    } = payload;

    // Cheap validation first, before any DB call
    if (role === MemberRole.ADMIN) {
      throw new ApiError(400, "The admin role cannot be assigned.");
    }

    const targetMember = await this.getManageableTargetMember({
      tenantId,
      currentMembershipId,
      targetMembershipId: id,
      action: "UPDATE_ROLE",
    });

    const oldRole = targetMember.role;

    if (oldRole === role) {
      throw new ApiError(400, "Member already has this role.");
    }

    const result = await sequelize.transaction(async (transaction) => {
      if (role === MemberRole.MANAGER) {
        // Lock the tenant row so concurrent promotions are serialized
        await tenantRepository.findByIdForUpdate(tenantId, transaction);

        const managerCount = await membershipRepository.countByTenantAndRole(
          tenantId,
          MemberRole.MANAGER,
          transaction,
        );

        if (managerCount >= MAX_MANAGERS_PER_TENANT) {
          throw new ApiError(
            400,
            `A tenant can have at most ${MAX_MANAGERS_PER_TENANT} managers.`,
          );
        }
      }

      return membershipRepository.update({ id, tenantId }, { role }, {transaction});
    });

    // Emit only after a successful commit
    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.MEMBERSHIP,
      action: RealtimeAction.UPDATED,
      tenantId,
    });

    try {
      await notificationService.create({
        tenantId,
        userId: targetMember.userId,
        createdBy: adminId,
        mealSessionId,
        title: "Role Updated",
        message: `Your role has been changed from ${oldRole} to ${role}.`,
        type: Notification.ROLE_UPDATED,
      });
    } catch (error) {
      logger.warn(
        {
          tenantId,
          targetUserId: targetMember.userId,
          targetMembershipId: id,
          mealSessionId,
          oldRole,
          newRole: role,
          error,
        },
        "[Membership] Failed to create role notification",
      );
    }

    return result;
  }

  async deleteMember(payload: IDeleteMemberPayload) {
    const { tenantId, currentMembershipId, targetMembershipId } = payload;

    const targetMember = await this.getManageableTargetMember({
      tenantId,
      currentMembershipId,
      targetMembershipId,
      action: "REMOVE",
    });

    if (targetMember.role === MemberRole.MANAGER) {
      throw new ApiError(403, "The manager cannot be removed.");
    }

    await membershipRepository.delete({ id: targetMember.id, tenantId });

    socketService.emitToTenant(tenantId, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.MEMBERSHIP,
      action: RealtimeAction.DELETED,
      tenantId,
    });
  }
}

export const membershipService = new TenantMembershipService();

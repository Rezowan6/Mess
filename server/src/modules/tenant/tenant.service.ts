import sequelize from "@/configs/db.js";

import { MemberRole, MemberStatus } from "@/constans/index.js";
import {
  RealtimeAction,
  RealtimeResource,
} from "@/socket/realtime.constant.js";
import { SocketEvent } from "@/socket/socket-event.js";
import { socketService } from "@/socket/socket.service.js";
import { generateSlug } from "@/utils/generate.slug.js";
import { ApiError } from "@/utils/index.js";
import { membershipRepository } from "../tenantMembership/tenantMembership.repository.js";
import { tenantRepository } from "./tenant.repository.js";

class TenantService {
  async create(id: number, name: string) {
    const result = await sequelize.transaction(async (transaction) => {
      const slug = generateSlug(name);

      const exists = await tenantRepository.findOne({
        slug,
      });

      if (exists) {
        throw new ApiError(409, "Tenant slug already exists");
      }

      const existingMembership = await membershipRepository.findOne({
        userId: id,
        role: MemberRole.ADMIN,
      });

      if (existingMembership) {
        throw new ApiError(409, "One user can own only one mess");
      }

      const tenant = await tenantRepository.createWithOptions(
        {
          name,
          slug,
        },
        { transaction },
      );

      const membership = await membershipRepository.createWithOptions(
        {
          userId: id,
          tenantId: tenant.id,
          role: MemberRole.ADMIN,
          status: MemberStatus.ACTIVE,
        },
        { transaction },
      );

      return {
        tenant,
        membership,
      };
    });

    socketService.emitToTenant(result.tenant.id, SocketEvent.DATA_UPDATED, {
      resource: RealtimeResource.TENANT,
      action: RealtimeAction.CREATED,
      tenantId: result.tenant.id,
    });

    return result;
  }
}
export const tenantService = new TenantService();

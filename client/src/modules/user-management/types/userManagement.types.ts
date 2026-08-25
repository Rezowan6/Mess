import type { Role } from "@/shared/constants/roles";
import type {
  IPaginationMeta,
  IPaginationParams,
} from "@/shared/types/pagination.types";

export interface IMemberUser {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
}

export interface ITenantMember {
  id: number;

  userId: number;

  tenantId: number;

  role: Role;

  status: "active" | "inactive" | "pending";

  createdAt: string;

  user: IMemberUser;
}

export interface IMemberListResponse {
  statusCode: number;

  success: boolean;

  message: string;

  data: ITenantMember[];

  meta: IPaginationMeta;
}

export type IMemberParams = IPaginationParams;

export interface ITenantMemberDeposit extends ITenantMember {
  totalDeposit?: number;
}

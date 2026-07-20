import type { Role } from "@/shared/constants/roles";

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
}

export interface MemberParams {
  page: number;

  limit: number;

  search?: string;
}

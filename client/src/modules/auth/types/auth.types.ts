import type { Role } from "@/shared/constants/roles";

export interface ITenantMembership {
  tenantId: number;

  role: Role;

  status: string;

  tenant: {
    id: number;
    name: string;
    slug: string;
  };
}
export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IAuthUser {
  id: number;

  name: string;

  email: string;

  tenantMemberships: ITenantMembership[];
}

export interface IAuthState {
  accessToken: string | null;
  user: IAuthUser | null;
  isAuthenticated: boolean;

  setAccessToken: (token: string | null) => void;
  setUser: (user: IAuthUser | null) => void;

  logout: () => void;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: IUser;
  };
}

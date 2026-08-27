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
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export interface IAuthUser extends IUser {
  tenantMemberships: ITenantMembership[];
}

export interface IAuthState {
  accessToken: string | null;
  user: IAuthUser | null;
  isAuthenticated: boolean;

  isInitialized: boolean;

  setInitialized: (value: boolean) => void;

  setAccessToken: (token: string | null) => void;
  setUser: (user: IAuthUser | null) => void;

  logout: () => void;
}

export interface ILoginResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: IUser;
  };
}

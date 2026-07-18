import { UserStatus } from "../user/user.interface.js";

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  ip: string;
  userAgent: string;
  email: string;
  password: string;
  tenantSlug: string;
}
export interface RegisterResponse {
  message: string;
  user: {
    id: number;
    name: string | null;
    email: string;
    isVerified: boolean;
    status: UserStatus;
  };
}

export interface LoginResponse {
  refreshToken: string;
  data: {
    accessToken: string;
    user: {
      id: number;
      name: string | null;
      email: string;
    };
  };
}

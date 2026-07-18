export const USER_STATUS = ["active", "inactive"] as const;
export type UserStatus = (typeof USER_STATUS)[number];

export interface CreateUserDto {
  email: string;
  password: string;
}

export interface ICreateUserResponse {
  id: number;
  name: string | null;
  email: string;
  isVerified: boolean;
  status: UserStatus;
}

export interface CreateUserPayload {
  name?: string | null;
  email: string;
  password: string;
  status?: UserStatus;
  isVerified?: boolean;
}

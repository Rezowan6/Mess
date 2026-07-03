export const USER_STATUS = ["active", "inactive"] as const;
export type UserStatus = (typeof USER_STATUS)[number];

export interface CreateUserDto {
  email: string;
  password: string;
}
export interface RegisterPayload {
  messName: string;
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  ip: string,
  userAgent: string;
  email: string;
  password: string;
  tenantSlug: string;
}

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },

  TENANT_MEMBERSHIP: {
    INVITES: "/invites",
    LIST: "/tenant-memberships",

    UPDATE_ROLE: (id: number) => `/tenant-memberships/${id}/role`,

    REMOVE: (id: number) => `/tenant-memberships/${id}`,
  },
};

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

  INVITE: {
    ACCEPT: "/invites/accept",
  },
  NOTIFICATION: {
    LIST: "/notifications",
    UNREAD_COUNT: "/notifications/unread-count",
    MARK_AS_READ: (id: number) => `/notifications/${id}/read`,
  },

  MEAL_REQUEST: {
    CREATE: "/meal-requests",
  },

  MEAL_SETTING: {
    CURRENT: "/meal-settings",
    CREATE: "/meal-settings",
    UPDATE: "/meal-settings",
    DELETE: (id: number) => `/meal-settings/${id}`,
  },

  MEAL_PREFERENCE: {
    LIST_ME: "meal-preferences/me",
    UPSERT: "/meal-preferences"
  },

  MEAL_SESSION: {
    GET_OPEN: "/meal-sessions",
    OPEN: "/meal-sessions",
    CLOSE: (id: number) => `/meal-sessions/${id}/close`,
  }
};

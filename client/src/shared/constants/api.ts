export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },

  TENANT: {
    CREATE: "/tenants",
  },
  MY_PROFILE: {
    INFO: "/my-profile/info",
    ALL: "/my-profile",
  },
  MONTHLY_CALCULATION: {
    CURRENT: "/monthly-calculations/current",
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

  MEAL_ENTRY: {
    LIST: "meal-entries",
    MY: "/meal-entries/my",
    TODAY_MEALS: "/meal-entries/today-meals",
    DAILY_SUMMARY: "/meal-entries/daily-summary",
    MEMBERS_MEAL_SUMMARY: "/meal-entries/members-meal-summary",
    SUMMARY: "/meal-entries/summary",
    MEMBER_SUMMARY: "/meal-entries/member-summary",
  },

  MEAL_REQUEST: {
    CREATE: "/meal-requests",
  },

  MEAL_SETTING: {
    CURRENT: "/meal-settings",
    CREATE: "/meal-settings",
    UPDATE: "/meal-settings",
    DELETE: `/meal-settings`,
  },

  MEAL_PREFERENCE: {
    LIST_ME: "meal-preferences/me",
    UPSERT: "/meal-preferences",
  },

  MEAL_SESSION: {
    GET_OPEN: "/meal-sessions",
    OPEN: "/meal-sessions",
    CLOSE: (id: number) => `/meal-sessions/${id}/close`,
  },

  EXPENSE: {
    GET_ALL: "/expenses",
    CREATE: "/expenses",
    SUMMARY: "/expenses/summary",
    GET_BY_ID: (id: number) => `/expenses/${id}`,
    UPDATE: (id: number) => `/expenses/${id}`,
    DELETE: (id: number) => `/expenses/${id}`,
  },
  DEPOSIT: {
    GET_ALL: "/deposits",
    MEMBER_DEPOSIT_SUMMARY: "/deposits/member-summary",
    SUMMARY: "/deposits/summary",
    CREATE: "/deposits",
    UPDATE: (id: number) => `/deposits/${id}`,
    DELETE: (id: number) => `/deposits/${id}`,
  },
};

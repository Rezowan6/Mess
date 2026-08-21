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

  PLAN: {
    LIST: "/plans",
    BY_ID: (id: number) => `/plans/${id}`,
    CREATE: "/plans",
    UPDATE: (id: number) => `/plans/${id}`,
    DELETE: (id: number) => `/plans/${id}`,
  },
  FEATURE: {
    LIST: "/features",
    BY_ID: (id: number) => `/features/${id}`,
    CREATE: "/features",
    UPDATE: (id: number) => `/features/${id}`,
    DELETE: (id: number) => `/features/${id}`,
  },
  PLAN_FEATURE: {
    LIST: "/plan-features",
    BY_ID: (id: number) => `/plan-features/${id}`,
    BY_PLAN_ID: (planId: number) => `/plan-features/plan/${planId}`,
    CREATE: "/plan-features",
    UPDATE: (id: number) => `/plan-features/${id}`,
    DELETE: (id: number) => `/plan-features/${id}`,
  },
  SUBSCRIPTION: {
    CREATE: "/subscriptions",
    CURRENT: "/subscriptions/current",
    MY_SUBSCRIPTIONS: "/subscriptions/my-subscriptions",
    BY_ID: (id: number) => `/subscriptions/${id}`,
    ACTIVATE: (id: number) => `/subscriptions/${id}/activate`,
    CANCEL: (id: number) => `/subscriptions/${id}/cancel`,
  },
  PAYMENT: {
    CREATE: "/payments",

    LIST: "/payments/my-payments",

    BY_ID: (id: number) => `/payments/${id}`,

    BY_SUBSCRIPTION_ID: (subscriptionId: number) =>
      `/payments/subscription/${subscriptionId}`,
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
    ALL: "/tenant-memberships/all",

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
    DELETE: (id: number) => `/notifications/${id}`,
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
  MEAL_PLANNING: {
    DAILY: "/meal-plannings/daily",
  },

  EXPENSE: {
    GET_ALL: "/expenses",
    CREATE: "/expenses",
    SUMMARY: "/expenses/summary",
    GET_BY_ID: (id: number) => `/expenses/${id}`,
    UPDATE: (id: number) => `/expenses/${id}`,
    DELETE: (id: number) => `/expenses/${id}`,
  },
  PARTY_EXPENSE: {
    LIST: "/party-expenses",
    CREATE: "/party-expenses",
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

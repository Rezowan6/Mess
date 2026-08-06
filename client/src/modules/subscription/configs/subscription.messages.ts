export const SUBSCRIPTION_MESSAGES = {
  empty: {
    title: "No Subscription Found",
    description: "There is no active subscription available for this mess.",
  },

  error: {
    title: "Failed to Load Subscription",
    description: "Unable to fetch subscription details. Please try again.",
  },
} as const;

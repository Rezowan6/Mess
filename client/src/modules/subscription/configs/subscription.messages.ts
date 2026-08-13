// subscription.messages.ts

export const SUBSCRIPTION_MESSAGES = {
  empty: {
    title: "No Active Subscription",
    description:
      "You don't have an active subscription yet. Choose a plan to get started.",
  },

  error: {
    title: "Failed to Load Subscription",
    description: "Unable to fetch your subscription details. Please try again.",
  },
} as const;

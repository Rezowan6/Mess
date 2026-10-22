export const KHALA_BILL_MESSAGES = {
  empty: {
    title: "No Khala Bills Found",
    description: "There are no Khala bills recorded for this month.",
  },
  error: {
    title: "Failed to Load Khala Bills",
    description: "Unable to fetch Khala bills. Please try again.",
  },
  memberNotFound: {
    title: "No Khala Bill History Found",
    description: "This member has no Khala bill records for this year.",
  },
} as const;

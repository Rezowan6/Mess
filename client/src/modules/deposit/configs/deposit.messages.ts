export const DEPOSIT_MESSAGES = {
  empty: {
    title: "No Deposits Found",
    description: "There are no deposits recorded in this mess yet.",
  },

  error: {
    title: "Failed to Load Deposits",
    description: "Unable to fetch deposit list. Please try again.",
  },
  memberNotFound: {
    title: "No Deposit History Found",
    description:
      "This member has no deposit records, or no member was selected.",
  },
} as const;

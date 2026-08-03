export const DEPOSIT_HISTORY_MESSAGES = {
  empty: {
    title: "No Deposit History Found",
    description: "You haven't made any deposits for this meal session yet.",
  },

  error: {
    title: "Failed to Load Deposit History",
    description: "Unable to fetch your deposit history. Please try again.",
  },
} as const;

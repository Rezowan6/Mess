export const CURRENT_BILL_MESSAGES = {
  title: "Current Bill",
  description: "Manage current bills and payment history.",
  memberNotFound: {
    title: "No Current Bill History Found",
    description: "This member has no current bill records yet.",
  },
  error: {
    title: "Failed to Load Current Bill History",
    description: "Something went wrong while loading current bill history.",
  },
  empty: {
    title: "No Current Bills Found",
    description: "No current bill records are available.",
  },
  table: {
    empty: "No current bill records found.",
  },

  deleted: {
    // Same shape as the Table `message` prop, so it can be passed directly
    empty: {
      title: "No Deleted Current Bills",
      description: "Deleted current bills will appear here when available.",
    },
    error: {
      title: "Failed to Load Deleted Current Bills",
      description: "Unable to load deleted current bills. Please try again.",
    },
    restore: {
      title: "Restore Current Bill",
      description:
        "Are you sure you want to restore this current bill? It will return to the active list.",
      confirmText: "Restore",
    },
  },
};

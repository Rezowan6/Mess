export const DEPOSIT_ADD_MESSAGES = {
  empty: {
    title: "No Members Found",
    description: "There are no members in this mess to add a deposit for.",
  },
  emptySearch: {
    title: "No Matching Members",
    description:
      "No member matches your search. Try a different name or email.",
  },
  error: {
    title: "Failed to Load Members",
    description: "Unable to fetch members. Please try again.",
  },
} as const;

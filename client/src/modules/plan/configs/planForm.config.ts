export const PLAN_FORM_CONFIG = {
  fields: {
    name: {
      label: "Plan Name",
      placeholder: "Enter plan name",
      type: "text",
    },

    slug: {
      label: "Slug",
      placeholder: "Enter plan slug",
      type: "text",
    },

    description: {
      label: "Description",
      placeholder: "Enter plan description",
      type: "textarea",
    },

    monthlyPrice: {
      label: "Monthly Price",
      placeholder: "Enter monthly price",
      type: "number",
    },

    yearlyPrice: {
      label: "Yearly Price",
      placeholder: "Enter yearly price",
      type: "number",
    },

    currency: {
      label: "Currency",
      placeholder: "BDT",
      type: "text",
    },

    durationDays: {
      label: "Duration (Days)",
      placeholder: "30",
      type: "number",
    },

    maxMembers: {
      label: "Maximum Members",
      placeholder: "Enter maximum members (-1 for unlimited)",
      type: "number",
    },

    isActive: {
      label: "Active",
      type: "checkbox",
    },
  },
} as const;

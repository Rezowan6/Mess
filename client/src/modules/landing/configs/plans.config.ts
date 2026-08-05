export const plans = [
  {
    name: "Free",
    slug: "free",
    description: "For small messes getting started.",

    monthlyPrice: 0,
    yearlyPrice: 0,
    currency: "BDT",

    durationDays: 30,

    maxMembers: 10,

    isPopular: false,

    features: [
      "Basic Meal Management",
      "Member Management",
      "Deposit Tracking",
      "Basic Reports",
    ],
  },

  {
    name: "Standard",
    slug: "standard",
    description: "For growing mess communities.",

    monthlyPrice: 299,
    yearlyPrice: 2990,
    currency: "BDT",

    durationDays: 30,

    maxMembers: 50,

    isPopular: true,

    features: [
      "Everything in Free",
      "Expense Management",
      "Monthly Calculation",
      "Advanced Reports",
      "Priority Support",
    ],
  },

  {
    name: "Premium",
    slug: "premium",
    description: "For professional mess management.",

    monthlyPrice: 699,
    yearlyPrice: 6990,
    currency: "BDT",

    durationDays: 30,

    maxMembers: -1, // Unlimited

    isPopular: false,

    features: [
      "Everything in Standard",
      "Unlimited Members",
      "Advanced Analytics",
      "Payment Integration",
      "Dedicated Support",
    ],
  },
] as const;

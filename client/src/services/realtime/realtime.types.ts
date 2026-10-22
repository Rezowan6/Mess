export type RealtimeResource =
  | "tenant"
  | "membership"
  | "meal-session"
  | "meal-setting"
  | "meal-planning"
  | "meal-preference"
  | "meal-request"
  | "expense"
  | "deposit"
  | "egg"
  | "rice"
  | "rice-payment"
  | "egg-rate"
  | "party-expense"
  | "sold-product"
  | "meal-entry"
<<<<<<< HEAD
  | "payment-method"
  | "my-profile";
=======
  | "my-profile"
  | "current-bill";
>>>>>>> 3fca7c4f14f0a8892c10dc7ea95bad9da42af510

export interface IDataUpdatedPayload {
  resource: RealtimeResource;
  action: "created" | "updated" | "deleted" | "restored";
  tenantId: number;
  mealSessionId: number;
}

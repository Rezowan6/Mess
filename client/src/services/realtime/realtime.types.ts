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
  | "my-profile";

export interface IDataUpdatedPayload {
  resource: RealtimeResource;
  action: "created" | "updated" | "deleted";
  tenantId: number;
  mealSessionId: number;
}

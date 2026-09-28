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
  | "egg-rate"
  | "party-expense"
  | "sold-product"
  | "my-profile";

export interface IDataUpdatedPayload {
  resource: RealtimeResource;
  action: "created" | "updated" | "deleted";
  tenantId: number;
  mealSessionId: number;
}

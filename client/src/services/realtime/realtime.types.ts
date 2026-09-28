export type RealtimeResource =
  | "meal-planning"
  | "meal-preference"
  | "meal-request"
  | "meal-entry"
  | "expense"
  | "deposit"
  | "egg"
  | "sold-product"
  | "monthly-calculation"
  | "dashboard"
  | "my-profile"
  | "subscription"
  | "payment";

export interface IDataUpdatedPayload {
  resource: RealtimeResource;
  action: "created" | "updated" | "deleted";
  tenantId: number;
  mealSessionId: number;
}

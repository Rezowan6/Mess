export const SETTLEMENT_PARTY_ROLES = ["PAYER", "PAYEE"] as const;
export type SettlementPartyRole =
  (typeof SETTLEMENT_PARTY_ROLES)[number];

export const SETTLEMENT_CONFIRMATION_ACTIONS = [
  "MARKED_PAID",
  "CONFIRMED_RECEIVED",
  "REJECTED",
  "DISPUTED",
] as const;
export type SettlementConfirmationAction =
  (typeof SETTLEMENT_CONFIRMATION_ACTIONS)[number];

export const SETTLEMENT_CONFIRMATION_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "REJECTED",
] as const;
export type SettlementConfirmationStatus =
  (typeof SETTLEMENT_CONFIRMATION_STATUSES)[number];
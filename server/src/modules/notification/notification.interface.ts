import { IPaginationQuery } from "@/types/pagination.interface.js";

export const Notification = {
  MEMBER_JOINED: "MEMBER_JOINED",

  ROLE_UPDATED: "ROLE_UPDATED",

  MEAL_REQUEST: "MEAL_REQUEST",

  MEAL_REJECTED: "MEAL_REJECTED",

  EXPENSE_CREATED: "EXPENSE_CREATED",

  PAYMENT_SUCCESS: "PAYMENT_SUCCESS",

  SYSTEM: "SYSTEM",

  MEAL_REQUEST_CREATED: "MEAL_REQUEST_CREATED",

  MEAL_REQUEST_APPROVED: "MEAL_REQUEST_APPROVED",

  DEPOSIT_ADDED: "DEPOSIT_ADDED",
  DEPOSIT_UPDATED: "DEPOSIT_UPDATED",
  DEPOSIT_DELETED: "DEPOSIT_DELETED",

<<<<<<< HEAD
  SETTLEMENT_CREATED: "SETTLEMENT_CREATED",
  SETTLEMENT_UPDATED: "SETTLEMENT_UPDATED",
  SETTLEMENT_DELETED: "SETTLEMENT_DELETED",
=======
  CURRENT_BILL_ADDED: "CURRENT_BILL_ADDED",
  CURRENT_BILL_UPDATED: "CURRENT_BILL_UPDATED",
  CURRENT_BILL_DELETED: "CURRENT_BILL_DELETED",

  KHALA_BILL_ADDED: "KHALA_BILL_ADDED",
  KHALA_BILL_UPDATED: "KHALA_BILL_UPDATED",
  KHALA_BILL_DELETED: "KHALA_BILL_DELETED",
  CURRENT_BILL_RESTORED: "CURRENT_BILL_RESTORED",
>>>>>>> 3fca7c4f14f0a8892c10dc7ea95bad9da42af510
} as const;

export type NotificationType = (typeof Notification)[keyof typeof Notification];

export interface INotificationContext {
  tenantId: number;
  userId: number;
  mealSessionId: number | null;
}

export interface INotificationPaginationContext extends INotificationContext {
  pagination: IPaginationQuery;
}

export interface ICreateNotification extends INotificationContext {
  createdBy: number;

  title: string;
  message: string;
  type: string;
}

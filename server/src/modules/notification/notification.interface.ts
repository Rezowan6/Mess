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
} as const;

export type NotificationType = (typeof Notification)[keyof typeof Notification];

export interface INotificationContext {
  tenantId: number;
  userId: number;
  mealSessionId: number;
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

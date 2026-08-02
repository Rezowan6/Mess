export const Notification = {
  MEMBER_JOINED: "MEMBER_JOINED",

  MEAL_REQUEST: "MEAL_REQUEST",

  EXPENSE_CREATED: "EXPENSE_CREATED",

  PAYMENT_SUCCESS: "PAYMENT_SUCCESS",

  SYSTEM: "SYSTEM",
} as const;

export type NotificationType = typeof Notification[keyof typeof Notification];;

export interface INotification {
  id: number;

  title: string;

  message: string;

  type: NotificationType;

  isRead: boolean;

  createdAt: string;
}

export interface INotificationResponse {
  data: INotification[];

  meta?: {
    page: number;
    limit?: number;
    totalPages?: number;
    total?: number;
  };
}

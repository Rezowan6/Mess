export const MealRequestStatus = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export type MealRequestStatus =
  (typeof MealRequestStatus)[keyof typeof MealRequestStatus];

// ===============================
// Meal Request Entity
// ===============================

export interface IMealRequest {
  id: number;

  tenantId: number;

  mealSessionId: number;

  userId: number;

  date: string;

  breakfast: number;

  lunch: number;

  dinner: number;

  status: MealRequestStatus;

  approvedBy?: number;

  approvedAt?: string;

  rejectedBy?: number;

  rejectedAt?: string;

  note?: string;

  createdAt: string;

  updatedAt: string;
}

// ===============================
// Create Meal Request Payload
// ===============================

export interface ICreateMealRequestPayload {
  fromDate: string;
  toDate: string;
  breakfast: number;
  lunch: number;
  dinner: number;
}

// ===============================
// My Meal Request Response
// ===============================

export interface IMyMealRequestResponse {
  id: number;

  date: string;

  breakfast: number;

  lunch: number;

  dinner: number;

  status: MealRequestStatus;

  createdAt: string;
}

// ===============================
// Pending Meal Request (Manager)
// ===============================

export interface IPendingMealRequest extends IMealRequest {
  requester?: {
    id: number;

    name: string;

    email: string;

    avatar?: string;
  };

  mealSession?: {
    id: number;

    month: number;

    year: number;

    status: string;
  };
}

// ===============================
// Approve Range Payload
// ===============================

export interface IApproveRangeMealRequestPayload {
  fromDate: string;

  toDate: string;
}

// ===============================
// Approve Response
// ===============================

export interface IApproveMealRequestResponse {
  approvedCount: number;
}

// ===============================
// Create Response
// ===============================

export interface ICreateMealRequestResponse {
  createdCount: number;

  skippedCount: number;

  skippedRequests: {
    date: string;

    reason: string;
  }[];
}

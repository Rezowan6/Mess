export interface IPartyExpense {
  id: number;
  tenantId: number;
  mealSessionId: number;
  amount: number;
  description?: string | null;
  date: string;
  createdAt: string;
  members: IPartyExpenseMember[];
}

export interface IPartyExpenseMember {
  id: number;
  partyExpenseId: number;
  memberId: number;
  amount: number;
  member: {
    id: number;
    name: string;
    email: string;
    avatar?: string | null;
  };
}

export interface ICreatePartyExpense {
  amount: number;
  description?: string;
  memberIds: number[];
}

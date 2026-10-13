import {
  MealSession,
  PartyExpense,
  PartyExpenseMember,
  Tenant,
  User,
} from "@/models/index.js";

export const setupPartyExpenseAssociations = () => {
  PartyExpense.hasMany(PartyExpenseMember, {
    foreignKey: "partyExpenseId",
    as: "members",
  });

  PartyExpenseMember.belongsTo(PartyExpense, {
    foreignKey: "partyExpenseId",
    as: "partyExpense",
  });

  PartyExpenseMember.belongsTo(User, {
    foreignKey: "memberId",
    as: "member",
  });

  User.hasMany(PartyExpenseMember, {
    foreignKey: "memberId",
    as: "partyExpenses",
  });

  PartyExpense.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Tenant.hasMany(PartyExpense, {
    foreignKey: "tenantId",
    as: "partyExpenses",
  });

  PartyExpense.belongsTo(MealSession, {
    foreignKey: "mealSessionId",
    as: "mealSession",
  });

  MealSession.hasMany(PartyExpense, {
    foreignKey: "mealSessionId",
    as: "partyExpenses",
  });
};
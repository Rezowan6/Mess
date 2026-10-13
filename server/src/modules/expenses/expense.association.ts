import { Expenses, MealSession, Tenant, User } from "@/models/index.js";

export const setupExpenseAssociations = () => {
  Expenses.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Tenant.hasMany(Expenses, {
    foreignKey: "tenantId",
    as: "expenses",
  });

  Expenses.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });

  User.hasMany(Expenses, {
    foreignKey: "createdBy",
    as: "createdExpenses",
  });

  Expenses.belongsTo(MealSession, {
    foreignKey: "mealSessionId",
    as: "mealSession",
  });

  MealSession.hasMany(Expenses, {
    foreignKey: "mealSessionId",
    as: "expenses",
  });
};
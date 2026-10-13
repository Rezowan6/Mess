import { Deposit, MealSession, Tenant, User } from "@/models/index.js";

export const setupDepositAssociations = () => {
  Deposit.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Tenant.hasMany(Deposit, {
    foreignKey: "tenantId",
    as: "deposits",
  });

  Deposit.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });

  User.hasMany(Deposit, {
    foreignKey: "createdBy",
    as: "createdDeposits",
  });

  Deposit.belongsTo(User, {
    foreignKey: "memberId",
    as: "member",
  });

  User.hasMany(Deposit, {
    foreignKey: "memberId",
    as: "memberDeposits",
  });

  Deposit.belongsTo(MealSession, {
    foreignKey: "mealSessionId",
    as: "mealSession",
  });

  MealSession.hasMany(Deposit, {
    foreignKey: "mealSessionId",
    as: "deposits",
  });
};
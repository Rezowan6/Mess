import { Settlement, MealSession, Tenant, User } from "@/models/index.js";

export const setupSettlementAssociations = () => {
  Settlement.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Tenant.hasMany(Settlement, {
    foreignKey: "tenantId",
    as: "settlements",
  });

  Settlement.belongsTo(MealSession, {
    foreignKey: "mealSessionId",
    as: "mealSession",
  });

  MealSession.hasMany(Settlement, {
    foreignKey: "mealSessionId",
    as: "settlements",
  });

  Settlement.belongsTo(User, {
    foreignKey: "memberId",
    as: "member",
  });

  User.hasMany(Settlement, {
    foreignKey: "memberId",
    as: "memberSettlements",
  });

  Settlement.belongsTo(User, {
    foreignKey: "payerId",
    as: "payer",
  });

  User.hasMany(Settlement, {
    foreignKey: "payerId",
    as: "payableSettlements",
  });

  Settlement.belongsTo(User, {
    foreignKey: "payeeId",
    as: "payee",
  });

  User.hasMany(Settlement, {
    foreignKey: "payeeId",
    as: "receivableSettlements",
  });

  Settlement.belongsTo(User, {
    foreignKey: "initiatedBy",
    as: "initiator",
  });

  Settlement.belongsTo(User, {
    foreignKey: "cancelledBy",
    as: "canceller",
  });

  Settlement.belongsTo(User, {
    foreignKey: "disputedBy",
    as: "disputant",
  });

  Settlement.belongsTo(User, {
    foreignKey: "resolvedBy",
    as: "resolver",
  });
};
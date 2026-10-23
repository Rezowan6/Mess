import {
  SettlementConfirmation,
  Settlement,
  Tenant,
  User,
} from "@/models/index.js";

export const setupSettlementConfirmationAssociations = () => {
  SettlementConfirmation.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Tenant.hasMany(SettlementConfirmation, {
    foreignKey: "tenantId",
    as: "settlementConfirmations",
  });

  SettlementConfirmation.belongsTo(Settlement, {
    foreignKey: "settlementId",
    as: "settlement",
  });

  Settlement.hasMany(SettlementConfirmation, {
    foreignKey: "settlementId",
    as: "confirmations",
  });

  SettlementConfirmation.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  User.hasMany(SettlementConfirmation, {
    foreignKey: "userId",
    as: "settlementConfirmations",
  });
};
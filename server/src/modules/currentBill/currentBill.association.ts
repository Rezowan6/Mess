import { CurrentBill, Tenant, User } from "@/models/index.js";

export const setupCurrentBillAssociations = () => {
  CurrentBill.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Tenant.hasMany(CurrentBill, {
    foreignKey: "tenantId",
    as: "currentBills",
  });

  CurrentBill.belongsTo(User, {
    foreignKey: "userId",
    as: "member",
  });

  User.hasMany(CurrentBill, {
    foreignKey: "userId",
    as: "currentBills",
  });

  CurrentBill.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });

  User.hasMany(CurrentBill, {
    foreignKey: "createdBy",
    as: "createdCurrentBills",
  });
};

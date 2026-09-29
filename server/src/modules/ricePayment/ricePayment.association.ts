import { MealSession, Tenant, User } from "@/models/index.js";

import { Rice } from "../rice/rice.model.js";
import { RicePayment } from "./ricePayment.model.js";

export const setupRicePaymentAssociations = () => {
  RicePayment.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  RicePayment.belongsTo(MealSession, {
    foreignKey: "mealSessionId",
    as: "mealSession",
  });

  RicePayment.belongsTo(Rice, {
    foreignKey: "riceId",
    as: "rice",
  });

  RicePayment.belongsTo(User, {
    foreignKey: "createdBy",
    as: "creator",
  });

  Tenant.hasMany(RicePayment, {
    foreignKey: "tenantId",
    as: "ricePayments",
  });

  MealSession.hasMany(RicePayment, {
    foreignKey: "mealSessionId",
    as: "ricePayments",
  });

  Rice.hasMany(RicePayment, {
    foreignKey: "riceId",
    as: "payments",
  });

  User.hasMany(RicePayment, {
    foreignKey: "createdBy",
    as: "createdRicePayments",
  });
};

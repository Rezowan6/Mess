
import { PaymentMethod, Settlement, Tenant, User } from '@/models/index.js';

export function setupPaymentMethodAssociations(): void {
  Tenant.hasMany(PaymentMethod, {
    foreignKey: "tenantId",
    as: "paymentMethods",
  });

  PaymentMethod.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  User.hasMany(PaymentMethod, {
    foreignKey: "userId",
    as: "paymentMethods",
  });

  PaymentMethod.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  PaymentMethod.hasMany(Settlement, {
    foreignKey: "paymentMethodId",
    as: "settlements",
  });

  Settlement.belongsTo(PaymentMethod, {
    foreignKey: "paymentMethodId",
    as: "paymentMethod",
  });
}
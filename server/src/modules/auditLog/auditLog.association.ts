import {
  AuditLog,
  Tenant,
  User,
} from "@/models/index.js";

export const setupAuditLogAssociations = () => {
  AuditLog.belongsTo(Tenant, {
    foreignKey: "tenantId",
    as: "tenant",
  });

  Tenant.hasMany(AuditLog, {
    foreignKey: "tenantId",
    as: "auditLogs",
  });

  AuditLog.belongsTo(User, {
    foreignKey: "actorId",
    as: "actor",
  });

  User.hasMany(AuditLog, {
    foreignKey: "actorId",
    as: "auditLogs",
  });
};
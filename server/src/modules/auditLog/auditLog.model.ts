import sequelize from "@/configs/db.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export const AUDIT_LOG_ACTIONS = [
  "SETTLEMENT_CREATED",
  "SETTLEMENT_PAID",
  "SETTLEMENT_CONFIRMED",
  "SETTLEMENT_CANCELLED",
  "SETTLEMENT_DISPUTED",
  "PAYMENT_METHOD_CREATED",
  "PAYMENT_METHOD_UPDATED",
  "PAYMENT_METHOD_DELETED",
] as const;

export const AUDIT_LOG_ENTITY_TYPES = [
  "SETTLEMENT",
  "PAYMENT_METHOD",
] as const;

export type AuditLogAction = (typeof AUDIT_LOG_ACTIONS)[number];
export type AuditLogEntityType = (typeof AUDIT_LOG_ENTITY_TYPES)[number];

export class AuditLog extends Model<
  InferAttributes<AuditLog, { omit: "createdAt" }>,
  InferCreationAttributes<AuditLog, { omit: "createdAt" }>
> {
  declare id: CreationOptional<string>;
  declare tenantId: number;
  declare actorId: number | null;
  declare action: AuditLogAction;
  declare entityType: AuditLogEntityType;
  declare entityId: string;
  declare oldValues: Record<string, unknown> | null;
  declare newValues: Record<string, unknown> | null;
  declare requestId: string | null;
  declare ipAddress: string | null;
  declare userAgent: string | null;
  declare readonly createdAt: CreationOptional<Date>;
}

AuditLog.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    tenantId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "tenant_id",
    },
    actorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      field: "actor_id",
    },
    action: {
      type: DataTypes.ENUM(...AUDIT_LOG_ACTIONS),
      allowNull: false,
    },
    entityType: {
      type: DataTypes.ENUM(...AUDIT_LOG_ENTITY_TYPES),
      allowNull: false,
      field: "entity_type",
    },
    entityId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: "entity_id",
    },
    oldValues: {
      type: DataTypes.JSON,
      allowNull: true,
      field: "old_values",
    },
    newValues: {
      type: DataTypes.JSON,
      allowNull: true,
      field: "new_values",
    },
    requestId: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "request_id",
    },
    ipAddress: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: "ip_address",
    },
    userAgent: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "user_agent",
    },
  },
  {
    sequelize,
    tableName: "audit_logs",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: false,
    underscored: true,
    hooks: {
      beforeUpdate: () => {
        throw new Error("Audit log records cannot be updated.");
      },
      beforeDestroy: () => {
        throw new Error("Audit log records cannot be deleted.");
      },
      beforeBulkUpdate: () => {
        throw new Error("Audit log records cannot be bulk updated.");
      },
      beforeBulkDestroy: () => {
        throw new Error("Audit log records cannot be bulk deleted.");
      },
    },
    indexes: [
      {
        fields: ["tenant_id", "created_at"],
      },
      {
        fields: ["tenant_id", "entity_type", "entity_id"],
      },
      {
        fields: ["tenant_id", "actor_id"],
      },
      {
        fields: ["request_id"],
      },
    ],
  },
);
import sequelize from "@/configs/db.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import {
  SETTLEMENT_CONFIRMATION_ACTIONS,
  SETTLEMENT_CONFIRMATION_STATUSES,
  SETTLEMENT_PARTY_ROLES,
  SettlementConfirmationAction,
  SettlementConfirmationStatus,
  SettlementPartyRole,
} from "./settlementConfirmation.interface.js";

export class SettlementConfirmation extends Model<
  InferAttributes<
    SettlementConfirmation,
    {
      omit: "createdAt" | "updatedAt";
    }
  >,
  InferCreationAttributes<SettlementConfirmation>
> {
  declare id: CreationOptional<string>;
  declare tenantId: number;
  declare settlementId: string;
  declare userId: number;
  declare partyRole: SettlementPartyRole;
  declare action: SettlementConfirmationAction;
  declare status: CreationOptional<SettlementConfirmationStatus>;
  declare note: CreationOptional<string | null>;
  declare ipAddress: CreationOptional<string | null>;
  declare userAgent: CreationOptional<string | null>;
  declare confirmedAt: CreationOptional<Date | null>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

SettlementConfirmation.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    tenantId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "tenant_id",
    },
    settlementId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      field: "settlement_id",
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "user_id",
    },
    partyRole: {
      type: DataTypes.ENUM(...SETTLEMENT_PARTY_ROLES),
      allowNull: false,
      field: "party_role",
    },
    action: {
      type: DataTypes.ENUM(...SETTLEMENT_CONFIRMATION_ACTIONS),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...SETTLEMENT_CONFIRMATION_STATUSES),
      allowNull: false,
      defaultValue: "PENDING",
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    confirmedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "confirmed_at",
    },
  },
  {
    sequelize,
    modelName: "SettlementConfirmation",
    tableName: "settlement_confirmations",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        name: "uq_settlement_confirmation_action",
        unique: true,
        fields: ["settlement_id", "user_id", "action"],
      },
      {
        name: "idx_settlement_confirmations_tenant_settlement",
        fields: ["tenant_id", "settlement_id"],
      },
      {
        name: "idx_settlement_confirmations_tenant_user",
        fields: ["tenant_id", "user_id"],
      },
    ],
  },
);

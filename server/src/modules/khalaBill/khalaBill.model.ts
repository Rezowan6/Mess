import sequelize from "@/configs/db.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import {
  DEPOSIT_PAYMENT_METHOD,
  DepositPaymentMethodType,
} from "../deposit/deposit.interface.js";
import { KHALA_BILL_STATUS, KhalaillStatus } from "./khalaBill.interface.js";

export class KhalaBill extends Model<
  InferAttributes<
    KhalaBill,
    {
      omit: "createdAt" | "updatedAt" | "deletedAt";
    }
  >,
  InferCreationAttributes<KhalaBill>
> {
  declare id: CreationOptional<number>;
  declare tenantId: number;
  declare userId: number;
  declare month: number;
  declare year: number;

  declare amount: number;

  declare status: CreationOptional<KhalaillStatus>;
  declare createdBy: CreationOptional<number | null>;

  declare paymentMethod: DepositPaymentMethodType;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
}

KhalaBill.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    tenantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 12 },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 2000, max: 9999 },
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM(...KHALA_BILL_STATUS),
      allowNull: false,
      defaultValue: "pending",
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    paymentMethod: {
      type: DataTypes.ENUM(...DEPOSIT_PAYMENT_METHOD),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "KhalaBill",
    tableName: "khala_bills",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        name: "khala_bills_tenant_user_period_unique",
        fields: ["tenant_id", "user_id", "year", "month"],
      },
      {
        name: "khala_bills_tenant_period_status_index",
        fields: ["tenant_id", "year", "month", "status"],
      },
      {
        name: "khala_bills_user_index",
        fields: ["user_id"],
      },
    ],
  },
);

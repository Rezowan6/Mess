import sequelize from "@/configs/db.js";
import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";

export enum PaymentProvider {
  BKASH = "BKASH",
  NAGAD = "NAGAD",
  ROCKET = "ROCKET",
  BANK = "BANK",
}

export class PaymentMethod extends Model<
  InferAttributes<PaymentMethod>,
  InferCreationAttributes<PaymentMethod>
> {
  declare id: CreationOptional<number>;
  declare tenantId: number;
  declare userId: number;
  declare provider: PaymentProvider;
  declare accountName: string;
  declare accountNumberEncrypted: string;
  declare accountLast4: string;
  declare isDefault: CreationOptional<boolean>;
  declare isVerified: CreationOptional<boolean>;
  declare verifiedAt: CreationOptional<Date | null>;
  declare isActive: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date | null>;
}

PaymentMethod.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tenantId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "tenant_id",
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "user_id",
    },
    provider: {
      type: DataTypes.ENUM(...Object.values(PaymentProvider)),
      allowNull: false,
    },
    accountName: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: "account_name",
    },
    accountNumberEncrypted: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "account_number_encrypted",
    },
    accountLast4: {
      type: DataTypes.CHAR(4),
      allowNull: false,
      field: "account_last4",
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "is_default",
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "is_verified",
    },
    verifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      field: "verified_at",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_active",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at",
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      field: "deleted_at",
    },
  },
  {
    sequelize,
    tableName: "payment_methods",
    timestamps: true,
    underscored: true,
    paranoid: true,
    indexes: [
      {
        name: "idx_payment_methods_tenant_user",
        fields: ["tenant_id", "user_id"],
      },
      {
        name: "idx_payment_methods_tenant_active",
        fields: ["tenant_id", "is_active"],
      },
    ],
  },
);

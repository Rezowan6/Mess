import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import sequelize from "@/configs/db.js";

import {
  PAYMENT_GATEWAYS,
  PAYMENT_STATUSES,
  PaymentGatewayType,
  PaymentStatus,
  PaymentStatusType,
} from "./payment.interface.js";

export class Payment extends Model<
  InferAttributes<
    Payment,
    {
      omit: "createdAt" | "updatedAt";
    }
  >,
  InferCreationAttributes<Payment>
> {
  declare id: CreationOptional<number>;

  declare tenantId: number;

  declare subscriptionId: number;

  declare transactionId: string | null;

  declare gateway: PaymentGatewayType;

  declare amount: string;

  declare status: PaymentStatusType;

  declare paidAt: Date | null;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    tenantId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    subscriptionId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    transactionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    gateway: {
      type: DataTypes.ENUM(...PAYMENT_GATEWAYS),
      allowNull: false,
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },

    status: {
      type: DataTypes.ENUM(...PAYMENT_STATUSES),
      allowNull: false,
      defaultValue: PaymentStatus.PENDING,
    },

    paidAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,

    modelName: "Payment",

    tableName: "payments",

    timestamps: true,

    underscored: true,

    indexes: [
      {
        fields: ["tenantId"],
      },

      {
        fields: ["status"],
      },

      {
        fields: ["gateway"],
      },

      {
        fields: ["transactionId"],
      },

      {
        fields: ["tenantId", "status"],
      },
    ],
  },
);

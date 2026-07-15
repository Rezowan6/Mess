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
  InferAttributes<Payment>,
  InferCreationAttributes<Payment>
> {
  declare id: CreationOptional<number>;

  declare tenantId: number;

  declare subscriptionId: number;

  declare transactionId: string | null;

  declare gatewayPaymentId: string | null;

  declare gateway: PaymentGatewayType;

  declare amount: string;

  declare status: PaymentStatusType;

  declare paidAt: Date | null;

  declare gatewayResponse: unknown | null;

  declare failureReason: string | null;

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

    gatewayPaymentId: {
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
    gatewayResponse: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    failureReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
        fields: ["subscriptionId"],
      },

      {
        fields: ["status"],
      },

      {
        fields: ["gateway"],
      },

      {
        unique: true,
        fields: ["transactionId"],
      },

      {
        unique: true,
        fields: ["gatewayPaymentId"],
      },

      {
        fields: ["tenantId", "status"],
      },
    ],
  },
);

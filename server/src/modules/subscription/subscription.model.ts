import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import sequelize from "@/configs/db.js";
import {
  SUBSCRIPTION_STATUSES,
  SubscriptionStatus,
  SubscriptionStatusType,
} from "./subscription.interface.js";

export class Subscription extends Model<
  InferAttributes<
    Subscription,
    {
      omit: "createdAt" | "updatedAt";
    }
  >,
  InferCreationAttributes<Subscription>
> {
  declare id: CreationOptional<number>;

  declare tenantId: number;

  declare planId: number;

  declare status: SubscriptionStatusType;
  
  declare amount: string;

  declare isFreeTrial: boolean;

  declare startDate: Date;

  declare endDate: Date | null;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;
}

Subscription.init(
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

    planId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },

    status: {
      type: DataTypes.ENUM(...SUBSCRIPTION_STATUSES),
      allowNull: false,
      defaultValue: SubscriptionStatus.PENDING,
    },

    isFreeTrial: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Subscription",
    tableName: "subscriptions",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ["tenantId"],
      },

      {
        fields: ["planId"],
      },

      {
        fields: ["status"],
      },

      {
        fields: ["isFreeTrial"],
      },

      {
        fields: ["tenantId", "status"],
      },

      {
        fields: ["tenantId", "isFreeTrial"],
      },
    ],
  },
);

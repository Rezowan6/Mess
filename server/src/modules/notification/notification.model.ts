import sequelize from "@/configs/db.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export class Notification extends Model<
  InferAttributes<
    Notification,
    {
      omit: "createdAt" | "updatedAt" | "deletedAt";
    }
  >,
  InferCreationAttributes<Notification>
> {
  declare id: CreationOptional<number>;

  declare title: string;
  declare message: string;

  declare type: string;

  declare isRead: CreationOptional<boolean>;

  // Multi Tenant
  declare tenantId: number;
  declare mealSessionId: number | null;

  // Receiver
  declare userId: number;

  // Who generated this notification
  declare createdBy: number;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    type: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    tenantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    mealSessionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Notification",
    tableName: "notifications",
    timestamps: true,
    underscored: true,
    paranoid: true,

    indexes: [
      {
        fields: ["tenantId"],
      },
      {
        fields: ["tenantId", "userId"],
      },
      {
        fields: ["tenantId", "isRead"],
      },
      {
        fields: ["tenantId", "type"],
      },
    ],
  },
);

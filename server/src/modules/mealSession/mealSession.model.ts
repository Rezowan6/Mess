import sequelize from "@/configs/db.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import {
  MEAL_SESSION_STATUS,
  MealSessionStatus,
} from "./mealSession.interface.js";

export class MealSession extends Model<
  InferAttributes<
    MealSession,
    {
      omit: "createdAt" | "updatedAt" | "deletedAt";
    }
  >,
  InferCreationAttributes<MealSession>
> {
  declare id: CreationOptional<number>;
  declare tenantId: number;
  declare month: number;
  declare year: number;
  declare sessionNumber: CreationOptional<number>;
  declare status: CreationOptional<MealSessionStatus>;
  declare openedBy: CreationOptional<number>;
  declare closedBy: CreationOptional<number>;
  declare openedAt: CreationOptional<Date>;
  declare closedAt: CreationOptional<Date>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
}

MealSession.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tenantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sessionNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    status: {
      type: DataTypes.ENUM(...MEAL_SESSION_STATUS),
      defaultValue: MealSessionStatus.OPEN,
    },
    openedBy: {
      type: DataTypes.INTEGER,
    },
    closedBy: {
      type: DataTypes.INTEGER,
    },
    openedAt: {
      type: DataTypes.DATE,
    },
    closedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "Mealsession",
    tableName: "meal_sessions",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        fields: ["tenant_id"],
      },
      {
        unique: true,
        name: "tenant_meal_sessions_period_number_unique",
        fields: ["tenant_id", "year", "month", "session_number"],
      },
      {
        name: "meal_sessions_tenant_status_period_index",
        fields: ["tenant_id", "status", "year", "month", "session_number"],
      },
    ],
  },
);

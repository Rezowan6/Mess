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

export class Mealsession extends Model<
  InferAttributes<
    Mealsession,
    {
      omit: "createdAt" | "updatedAt" | "deletedAt";
    }
  >,
  InferCreationAttributes<Mealsession>
> {
  declare id: CreationOptional<number>;
  declare tenantId: number;
  declare month: number;
  declare year: number;
  declare status: CreationOptional<MealSessionStatus>;
  declare openedBy: CreationOptional<number>;
  declare closedBy: CreationOptional<number>;
  declare openedAt: CreationOptional<Date>;
  declare closedAt: CreationOptional<Date>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
}

Mealsession.init(
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
    tableName: "mealsession",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["tenant_id", "month", "year"],
      },
      {
        fields: ["tenant_id"],
      },
      {
        fields: ["status"],
      },
    ],
  },
);

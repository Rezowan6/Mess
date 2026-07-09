import sequelize from "@/configs/db.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export class MealEntry extends Model<
  InferAttributes<
    MealEntry,
    {
      omit: "createdAt" | "updatedAt" | "deletedAt";
    }
  >,
  InferCreationAttributes<MealEntry>
> {
  declare id: CreationOptional<number>;
  declare tenantId: number;
  declare mealSessionId: number;
  declare mealRequestId: number;
  declare userId: number;
  declare date: Date;

  declare breakfast: CreationOptional<number>;
  declare lunch: CreationOptional<number>;
  declare dinner: CreationOptional<number>;
  declare guestMeal: CreationOptional<number>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
}

MealEntry.init(
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
    mealSessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mealRequestId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    breakfast: {
      type: DataTypes.DECIMAL,
    },
    lunch: {
      type: DataTypes.DECIMAL,
    },
    dinner: {
      type: DataTypes.DECIMAL,
    },
    guestMeal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
  },

  {
    sequelize,
    modelName: "MealEntry",
    tableName: "meal_entries",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["tenant_id", "meal_session_id", "user_id", "date"],
      },
      {
        fields: ["tenant_id"],
      },
      {
        fields: ["meal_session_id"],
      },
      {
        fields: ["user_id"],
      },
      {
        fields: ["meal_request_id"],
      },
      {
        fields: ["tenant_id", "date"],
      },
    ],
  },
);

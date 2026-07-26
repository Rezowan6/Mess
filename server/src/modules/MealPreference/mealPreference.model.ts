import sequelize from "@/configs/db.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export class MealPreference extends Model<
  InferAttributes<
    MealPreference,
    {
      omit: "createdAt" | "updatedAt" | "deletedAt";
    }
  >,
  InferCreationAttributes<MealPreference>
> {
  declare id: CreationOptional<number>;
  declare tenantId: number;
  declare userId: number;

  declare breakfast: CreationOptional<number>;
  declare lunch: CreationOptional<number>;
  declare dinner: CreationOptional<number>;

  declare guestMeal: CreationOptional<number>;

  declare isActive: boolean;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
}

MealPreference.init(
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    breakfast: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 1,
    },
    lunch: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 1,
    },
    dinner: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 1,
    },
    guestMeal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },

  {
    sequelize,
    modelName: "MealPreference",
    tableName: "meal_preferences",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["tenant_id", "user_id"],
      },
      {
        fields: ["tenant_id"],
      },
      {
        fields: ["user_id"],
      },
      {
        fields: ["is_active",],
      },
    ],
  },
);

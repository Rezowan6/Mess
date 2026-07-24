import sequelize from "@/configs/db.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export class MealSetting extends Model<
  InferAttributes<
    MealSetting,
    {
      omit: "createdAt" | "updatedAt" | "deletedAt";
    }
  >,
  InferCreationAttributes<MealSetting>
> {
  declare id: CreationOptional<number>;

  declare tenantId: number;

  declare breakfastCutoffMinute: number;
  declare breakfastPreviousDay: boolean;

  declare lunchCutoffMinute: number;

  declare dinnerCutoffMinute: number;

  declare allowGuestMeal: boolean;

  declare autoApproveMealRequest: boolean;

  declare timezone: string;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
}

MealSetting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    tenantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },

    breakfastCutoffMinute: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1320, // 10:00 PM
    },

    breakfastPreviousDay: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    lunchCutoffMinute: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 600, // 10:00 AM
    },

    dinnerCutoffMinute: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 960, // 4:00 PM
    },

    allowGuestMeal: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    autoApproveMealRequest: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    timezone: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Asia/Dhaka",
    },
  },
  {
    sequelize,
    modelName: "MealSetting",
    tableName: "meal_settings",

    timestamps: true,
    paranoid: true,
    underscored: true,

    indexes: [
      {
        unique: true,
        fields: ["tenant_id"],
      },
    ],
  },
);

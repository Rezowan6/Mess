import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import sequelize from "@/configs/db.js";

export class PlanFeature extends Model<
  InferAttributes<
    PlanFeature,
    {
      omit: "createdAt" | "updatedAt";
    }
  >,
  InferCreationAttributes<PlanFeature>
> {
  declare id: CreationOptional<number>;

  declare planId: number;

  declare featureId: number;

  declare value: string | null;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;
}

PlanFeature.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    planId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "plans",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    featureId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "features",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    value: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "PlanFeature",
    tableName: "plan_features",

    timestamps: true,
    underscored: true,

    indexes: [
      {
        unique: true,
        fields: ["plan_id", "feature_id"],
      },
    ],
  },
);

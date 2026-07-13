import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import sequelize from "@/configs/db.js";

export class Plan extends Model<
  InferAttributes<
    Plan,
    {
      omit: "createdAt" | "updatedAt";
    }
  >,
  InferCreationAttributes<Plan>
> {
  declare id: CreationOptional<number>;

  declare name: string;
  declare slug: string;

  declare description: string | null;

  declare monthlyPrice: string;
  declare yearlyPrice: string;
  declare currency: string;

  declare durationDays: number;

  declare maxMembers: number;

  declare isActive: CreationOptional<boolean>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Plan.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    monthlyPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },

    yearlyPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },

    currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "BDT",
    },

    durationDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 30,
    },

    maxMembers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 20,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Plan",
    tableName: "plans",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["slug"],
      },
      {
        unique: true,
        fields: ["name"],
      },
    ],
  },
);

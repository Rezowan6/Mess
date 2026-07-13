import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import sequelize from "@/configs/db.js";

export class Feature extends Model<
  InferAttributes<
    Feature,
    {
      omit: "createdAt" | "updatedAt";
    }
  >,
  InferCreationAttributes<Feature>
> {
  declare id: CreationOptional<number>;

  declare name: string;

  declare slug: string;

  declare description: string | null;

  declare isActive: CreationOptional<boolean>;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;
}

Feature.init(
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

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,

    tableName: "features",

    modelName: "Feature",

    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["slug"],
      },
    ],
  },
);

import sequelize from "@/configs/db.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export class Notice extends Model<
  InferAttributes<
    Notice,
    {
      omit: "createdAt" | "updatedAt" | "deletedAt";
    }
  >,
  InferCreationAttributes<Notice>
> {
  declare id: CreationOptional<number>;

  declare title: string;
  declare description: string;

  declare tenantId: number;
  declare mealSessionId: CreationOptional<number>;
  declare createdBy: number;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
}

Notice.init(
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

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    tenantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    mealSessionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Notice",
    tableName: "notices",
    timestamps: true,
    underscored: true,
    paranoid: true,
    indexes: [
      {
        fields: ["tenantId", "mealSessionId"],
      },
      {
        fields: ["tenantId"],
      },
    ],
  },
);

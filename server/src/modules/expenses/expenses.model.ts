import sequelize from "@/configs/db.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export class Expenses extends Model<
  InferAttributes<
    Expenses,
    {
      omit: "createdAt" | "updatedAt" | "deletedAt";
    }
  >,
  InferCreationAttributes<Expenses>
> {
  declare id: CreationOptional<number>;
  declare tenantId: number;
  declare mealSessionId: number;
  declare amount: number;
  declare category: CreationOptional<string>;
  declare description: CreationOptional<string>;
  declare signature: string;
  declare expensesDate: Date;
  declare createdBy: number;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
}

Expenses.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    tenantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mealSessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    signature: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expensesDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Expenses",
    tableName: "expenses",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        fields: ["tenant_id"],
      },
    ],
  },
);

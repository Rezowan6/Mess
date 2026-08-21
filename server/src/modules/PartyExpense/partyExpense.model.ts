import sequelize from "@/configs/db.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export class PartyExpense extends Model<
  InferAttributes<
    PartyExpense,
    {
      omit: "createdAt" | "updatedAt" | "deletedAt";
    }
  >,
  InferCreationAttributes<PartyExpense>
> {
  declare id: CreationOptional<number>;
  declare tenantId: number;
  declare mealSessionId: number;
  declare amount: number;
  declare description: CreationOptional<string | null>;
  declare date: CreationOptional<Date>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
}

PartyExpense.init(
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
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "PartyExpense",
    tableName: "party_expenses",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        fields: ["tenant_id"],
      },
      {
        fields: ["meal_session_id"],
      },
    ],
  },
);

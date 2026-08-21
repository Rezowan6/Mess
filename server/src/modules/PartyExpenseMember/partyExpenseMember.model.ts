import sequelize from "@/configs/db.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export class PartyExpenseMember extends Model<
  InferAttributes<
    PartyExpenseMember,
    {
      omit: "createdAt" | "updatedAt" | "deletedAt";
    }
  >,
  InferCreationAttributes<PartyExpenseMember>
> {
  declare id: CreationOptional<number>;
  declare partyExpenseId: number;
  declare memberId: number;

  declare amount: number;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
}

PartyExpenseMember.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    partyExpenseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PartyExpenseMember",
    tableName: "party_expense_members",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["party_expense_id", "member_id"],
      },
      {
        fields: ["party_expense_id"],
      },
      {
        fields: ["member_id"],
      },
    ],
  },
);

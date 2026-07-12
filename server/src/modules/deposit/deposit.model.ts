import sequelize from "@/configs/db.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import {
  DEPOSIT_PAYMENT_METHOD,
  DepositPaymentMethodType,
} from "./deposit.interface.js";

export class Deposit extends Model<
  InferAttributes<
    Deposit,
    {
      omit: "createdAt" | "updatedAt" | "deletedAt";
    }
  >,
  InferCreationAttributes<Deposit>
> {
  declare id: CreationOptional<number>;
  declare tenantId: number;
  declare mealSessionId: number;
  declare memberId: number;
  declare createdBy: number;
  declare amount: number;
  declare paymentMethod: DepositPaymentMethodType;
  declare depositDate: Date;
  declare note: CreationOptional<string | null>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
}

Deposit.init(
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
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    paymentMethod: {
      type: DataTypes.ENUM(...DEPOSIT_PAYMENT_METHOD),
      allowNull: false,
    },
    depositDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Deposit",
    tableName: "deposits",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        fields: ["tenant_id", "member_id", "meal_session_id"],
      },
      {
        fields: ["tenant_id", "meal_session_id"],
      },
    ],
  },
);

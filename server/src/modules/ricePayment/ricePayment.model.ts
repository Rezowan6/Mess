import sequelize from "@/configs/db.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export class RicePayment extends Model<
  InferAttributes<
    RicePayment,
    {
      omit: "createdAt" | "updatedAt" | "deletedAt";
    }
  >,
  InferCreationAttributes<RicePayment>
> {
  declare id: CreationOptional<number>;
  declare tenantId: number;
  declare mealSessionId: number;
  declare riceId: number;
  declare createdBy: number;

  declare amount: number;
  declare paymentMethod: "CASH" | "BKASH" | "BANK" | "OTHER";
  declare paymentDate: CreationOptional<Date>;
  declare note: CreationOptional<string | null>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
}

RicePayment.init(
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

    riceId: {
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
    },

    paymentMethod: {
      type: DataTypes.ENUM("CASH", "BKASH", "BANK", "OTHER"),
      allowNull: false,
    },

    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "RicePayment",
    tableName: "rice_payments",
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
      {
        fields: ["rice_id"],
      },
      {
        fields: ["tenant_id", "meal_session_id"],
      },
    ],
  },
);

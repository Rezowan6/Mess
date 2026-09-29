import sequelize from "@/configs/db.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export class Rice extends Model<
  InferAttributes<
    Rice,
    {
      omit: "createdAt" | "updatedAt" | "deletedAt";
    }
  >,
  InferCreationAttributes<Rice>
> {
  declare id: CreationOptional<number>;
  declare tenantId: number;
  declare mealSessionId: number;
  declare createdBy: number;

  declare quantity: number;
  declare unitPrice: number;
  declare totalAmount: number;

  declare purchaseType: "PAID" | "CREDIT";
  declare paymentStatus: "PAID" | "DUE" | "PARTIAL" | "SETTLED";

  declare supplierName: CreationOptional<string | null>;
  declare supplierPhone: CreationOptional<string | null>;

  declare purchaseDate: CreationOptional<Date>;
  declare dueDate: CreationOptional<Date | null>;

  declare note: CreationOptional<string | null>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
}

Rice.init(
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

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    purchaseType: {
      type: DataTypes.ENUM("PAID", "CREDIT"),
      allowNull: false,
    },

    paymentStatus: {
      type: DataTypes.ENUM("PAID", "DUE", "PARTIAL", "SETTLED"),
      allowNull: false,
    },

    supplierName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    supplierPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Rice",
    tableName: "rice_purchases",
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
        fields: ["tenant_id", "meal_session_id"],
      },
    ],
  },
);

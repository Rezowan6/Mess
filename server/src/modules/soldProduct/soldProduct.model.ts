import sequelize from "@/configs/db.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export class SoldProduct extends Model<
  InferAttributes<
    SoldProduct,
    {
      omit: "createdAt" | "updatedAt" | "deletedAt";
    }
  >,
  InferCreationAttributes<SoldProduct>
> {
  declare id: CreationOptional<number>;
  declare tenantId: number;
  declare mealSessionId: number;
  declare totalAmount: number;
  declare createdBy: number;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
}

SoldProduct.init(
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

    totalAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "SoldProduct",
    tableName: "sold_products",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["tenant_id", "meal_session_id"],
      },
      {
        fields: ["tenant_id"],
      },
    ],
  },
);

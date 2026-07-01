import sequelize from "@/configs/db.js";
import { DataTypes, Model } from "sequelize";
import { ITenant } from "./tenant.interface.js";

class Tenant extends Model<ITenant> implements ITenant {
  declare id: number;
  declare name: string;
  declare slug: string;
  declare ownerId: number;
  declare plan: "free" | "basic" | "premium";
  declare isActive: boolean;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Tenant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    plan: {
      type: DataTypes.ENUM("free", "basic", "premium"),
      defaultValue: "free",
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Tenant",
    tableName: "tenants",
    timestamps: true,
  },
);

export default Tenant;

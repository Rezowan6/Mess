import sequelize from "@/configs/db.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { TENANT_STATUS, TenantStatus } from "./tenant.interface.js";

export class Tenant extends Model<
  InferAttributes<
    Tenant,
    {
      omit: "createdAt" | "updatedAt" | "deletedAt";
    }
  >,
  InferCreationAttributes<Tenant>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare slug: string;
  declare status: CreationOptional<TenantStatus>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
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
    status: {
      type: DataTypes.ENUM(...TENANT_STATUS),
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "Tenant",
    tableName: "tenants",
    timestamps: true,
    paranoid: true,
    underscored: true,
  },
);


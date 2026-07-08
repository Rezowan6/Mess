import sequelize from "@/configs/db.js";
import { Tenant, User } from "@/models/index.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import {
  MEMBER_SHIP_ROLE,
  MEMBER_SHIP_STATUS,
  MemberShipRole,
  MemberShipStatus,
} from "./tenantMembership.interface.js";
import { MemberRole, MemberStatus } from "@/constans/index.js";

export class TenantMembership  extends Model<
  InferAttributes<
    TenantMembership ,
    {
      omit: "createdAt" | "updatedAt" | "deletedAt";
    }
  >,
  InferCreationAttributes<TenantMembership >
> {
  declare id: CreationOptional<number>;
  declare tenantId: number;
  declare userId: number;
  declare role: CreationOptional<MemberShipRole>;
  declare status: CreationOptional<MemberShipStatus>;
  declare joinedAt: CreationOptional<Date | null>;
  declare invitedBy: CreationOptional<number | null>;

  declare tenant?: NonAttribute<Tenant>;
  declare user?: NonAttribute<User>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
}

TenantMembership .init(
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM(...MEMBER_SHIP_ROLE),
      defaultValue: MemberRole.MEMBER,
    },
    status: {
      type: DataTypes.ENUM(...MEMBER_SHIP_STATUS),
      defaultValue: MemberStatus.INACTIVE,
    },
    joinedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    invitedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "MemberShip",
    tableName: "tenant_memberships",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["tenantId", "userId"],
        name: "tenant_memberships_tenant_user_unique",
      },
    ],
  },
);

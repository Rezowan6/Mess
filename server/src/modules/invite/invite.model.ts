import sequelize from "@/configs/db.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { INVITE_STATUS, InviteStatus } from "./invite.interface.js";

export class Invite extends Model<
  InferAttributes<
    Invite,
    {
      omit: "createdAt" | "updatedAt" | "deletedAt";
    }
  >,
  InferCreationAttributes<Invite>
> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare tokenHash: string;
  declare status: CreationOptional<InviteStatus>;
  
  declare tenantId: number;
  declare createdBy: number;

  declare expiresAt: Date;

  declare acceptedAt: CreationOptional<Date | null>;
  declare revokedAt: CreationOptional<Date | null>;

  declare maxUses: CreationOptional<number>;
  declare usedCount: CreationOptional<number>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
}

Invite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    tokenHash: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    tenantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(...INVITE_STATUS),
      defaultValue: "pending",
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    acceptedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    revokedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    maxUses: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },

    usedCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Invite",
    tableName: "invites",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      { fields: ["email", "tenantId"] },
      { fields: ["tokenHash"], unique: true },
      { fields: ["tenantId"] },
      { fields: ["status"] },
      { fields: ["expiresAt"] },
    ],
  },
);

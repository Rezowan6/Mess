import sequelize from "@/configs/db.js";
import { DataTypes, Model, Optional } from "sequelize";
import {
  IInviteAttributes,
  InviteRole,
  InviteStatus,
} from "./invite.interface.js";

/* -----------------------------
   CREATION TYPE
------------------------------*/
export type IInviteCreationAttributes = Optional<
  IInviteAttributes,
  | "id"
  | "status"
  | "usedCount"
  | "acceptedAt"
  | "revokedAt"
  | "createdAt"
  | "updatedAt"
>;

/* -----------------------------
   MODEL
------------------------------*/
class Invite
  extends Model<IInviteAttributes, IInviteCreationAttributes>
  implements IInviteAttributes
{
  declare id: number;

  declare email: string;
  declare tokenHash: string;

  declare role: InviteRole;

  declare tenantId: number;
  declare createdBy: number;

  declare status: InviteStatus;

  declare expiresAt: Date;

  declare acceptedAt?: Date | null;
  declare revokedAt?: Date | null;

  declare maxUses: number;
  declare usedCount: number;

  declare message?: string | null;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare readonly deletedAt: Date;
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

    role: {
      type: DataTypes.ENUM("user", "admin", "subAdmin", "messMalik"),
      allowNull: false,
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
      type: DataTypes.ENUM("pending", "accepted", "expired", "revoked"),
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
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Invite",
    tableName: "invites",
    timestamps: true,
    paranoid: false,

    indexes: [
      {
        fields: ["email", "tenantId"],
      },
      {
        fields: ["token"],
        unique: true,
      },
      {
        fields: ["tenantId"],
      },
      {
        fields: ["status"],
      },
      {
        fields: ["expiresAt"],
      },
    ],
  },
);

export default Invite;

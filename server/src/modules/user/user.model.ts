import sequelize from "@/configs/db.js";
import { DataTypes, Model, Optional } from "sequelize";
import {
  InviteStatus,
  IRefreshToken,
  IUserAttributes,
  Role,
} from "./user.interface.js";

/* -----------------------------
   OPTIONAL FOR CREATE()
------------------------------*/
export type IUserCreationAttributes = Optional<
  IUserAttributes,
  "id" | "createdAt" | "updatedAt"
>;

class User
  extends Model<IUserAttributes, IUserCreationAttributes>
  implements IUserAttributes
{
  declare id: number;

  declare name?: string;
  declare email: string;
  declare password: string;

  declare isVerified: boolean;

  declare role: Role;
  declare tenantId: number;
  declare createdBy?: number | null;

  declare isActive: boolean;

  declare refreshTokens: IRefreshToken[];

  declare emailVerificationToken?: string;
  declare passwordResetOTP?: string;
  declare passwordResetOTPExpires?: Date;

  declare inviteToken?: string;
  declare inviteExpires?: Date;
  declare linkAttempts?: string;

  declare loginAttempts: number;
  declare lockUntil?: Date;
  declare lastLogin?: Date;

  declare inviteStatus: InviteStatus;

  declare deletedAt?: Date;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: { type: DataTypes.STRING, allowNull: true },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    role: {
      type: DataTypes.ENUM(
        "systemOwner",
        "user",
        "admin",
        "subAdmin",
        "messMalik",
      ),
      defaultValue: "user",
    },
    tenantId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "tenants",
        key: "id",
      },
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    loginAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    lockUntil: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    inviteStatus: {
      type: DataTypes.ENUM("pending", "verified", "expired"),
      defaultValue: "pending",
    },

    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    paranoid: true,

    indexes: [
      {
        unique: true,
        fields: ["email", "tenantId"],
      },
      { fields: ["tenantId"] },
      { fields: ["role"] },
      { fields: ["createdBy"] },
    ],
  },
);

export default User;

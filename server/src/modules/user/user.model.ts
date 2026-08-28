import sequelize from "@/configs/db.js";
import { hashPassword } from "@/utils/bcrypt.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { USER_STATUS, UserStatus } from "./user.interface.js";
import { MemberShipRole } from "@/middlewares/role.middleware.js";
import { MemberRole } from "@/constans/index.js";
import { MEMBER_SHIP_ROLE } from "../tenantMembership/tenantMembership.interface.js";

export class User extends Model<
  InferAttributes<
    User,
    {
      omit: "createdAt" | "updatedAt" | "deletedAt";
    }
  >,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;

  declare name: CreationOptional<string | null>;

  declare email: string;

  declare password: string;

  declare avatar: CreationOptional<string | null>;

  declare status: CreationOptional<UserStatus>;

  declare isVerified: CreationOptional<boolean>;

  declare role: CreationOptional<MemberShipRole>;

  declare lastLoginAt: CreationOptional<Date | null>;

  declare readonly createdAt: CreationOptional<Date>;

  declare readonly updatedAt: CreationOptional<Date>;

  declare readonly deletedAt: CreationOptional<Date | null>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        isEmail: true,
        len: [5, 255],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 255],
      },
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...USER_STATUS),
      defaultValue: "active",
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM(...MEMBER_SHIP_ROLE),
      allowNull: false,
      defaultValue: "member",
    },
  },
  {
    sequelize,

    tableName: "users",

    modelName: "User",

    timestamps: true,

    paranoid: true,

    underscored: true,
    indexes: [{ fields: ["email"] }],
  },
);

User.beforeCreate(async (user) => {
  user.password = await hashPassword(user.password);
});

User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    user.password = await hashPassword(user.password);
  }
});

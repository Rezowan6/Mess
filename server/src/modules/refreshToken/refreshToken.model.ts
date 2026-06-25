import sequelize from "@/configs/db.js";
import { DataTypes, Model } from "sequelize";
import {
  RefreshTokenAttributes,
  RefreshTokenCreationAttributes,
} from "./refreshToken.interface.js";

class RefreshToken
  extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes>
  implements RefreshTokenAttributes
{
  declare id: number;
  declare userId: number;
  declare tenantId: number;
  declare tokenHash: string;
  declare deviceInfo: string | null;
  declare ipAddress: string | null;
  declare userAgent: string | null;
  declare expiresAt: Date;
  declare revokedAt: Date | null;
  declare createdAt: Date;
  declare updatedAt: Date;
}

RefreshToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    tenantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    tokenHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    deviceInfo: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    revokedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "RefreshToken",
    tableName: "refresh_tokens",
    timestamps: true,

    indexes: [
      {
        fields: ["userId"],
      },
      {
        fields: ["tenantId"],
      },
      {
        fields: ["tokenHash"],
      },
      {
        fields: ["expiresAt"],
      },
    ],
  },
);

export default RefreshToken;

import sequelize from "@/configs/db.js";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";


 export class RefreshToken extends Model<
  InferAttributes<
    RefreshToken,
    {
      omit: "createdAt" | "updatedAt" | "deletedAt";
    }
  >,
  InferCreationAttributes<RefreshToken>
> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare tokenHash: string;
  declare deviceInfo: string | null;
  declare ipAddress: string | null;
  declare userAgent: string | null;
  declare expiresAt: Date;
  declare revokedAt: CreationOptional<Date | null>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt?: Date;
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
    paranoid: true,
    underscored: true,
    indexes: [
      {
        fields: ["userId",],
      },
      {
        fields: ["tokenHash"],
        unique: true,
      },
      {
        fields: ["expiresAt"],
      },
    ],
  },
);

export default RefreshToken;

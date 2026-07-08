import sequelize from "@/configs/db.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import {
  MEAL_REQUEST_STATUSES,
  MealRequestStatus,
} from "./mealRequest.interface.js";

export class MealRequest extends Model<
  InferAttributes<
    MealRequest,
    {
      omit: "createdAt" | "updatedAt" | "deletedAt";
    }
  >,
  InferCreationAttributes<MealRequest>
> {
  declare id: CreationOptional<number>;
  declare tenantId: number;
  declare mealSessionId: number;
  declare userId: number;

  declare date: Date;

  declare breakfast: CreationOptional<number>;
  declare lunch: CreationOptional<number>;
  declare dinner: CreationOptional<number>;

  declare status: CreationOptional<MealRequestStatus>;

  declare approvedBy: CreationOptional<number>;
  declare approvedAt: CreationOptional<Date>;

  declare rejectedBy: CreationOptional<number>;
  declare rejectedAt: CreationOptional<Date>;

  declare note: CreationOptional<string>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
  declare readonly deletedAt: CreationOptional<Date | null>;
}

MealRequest.init(
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
    mealSessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    breakfast: {
      type: DataTypes.DECIMAL,
    },
    lunch: {
      type: DataTypes.DECIMAL,
    },
    dinner: {
      type: DataTypes.DECIMAL,
    },

    status: {
      type: DataTypes.ENUM(...MEAL_REQUEST_STATUSES),
      defaultValue: MealRequestStatus.PENDING,
    },
    approvedBy: {
      type: DataTypes.INTEGER,
    },
    approvedAt: {
      type: DataTypes.DATE,
    },
    rejectedBy: {
      type: DataTypes.INTEGER,
    },
    rejectedAt: {
      type: DataTypes.DATE,
    },
    note: {
      type: DataTypes.STRING,
    },
  },

  {
    sequelize,
    modelName: "MealRequest",
    tableName: "meal_requests",
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["tenant_id", "meal_session_id", "user_id", "date"],
      },
      {
        fields: ["tenant_id"],
      },
      {
        fields: ["meal_session_id"],
      },
      {
        fields: ["user_id"],
      },
      {
        fields: ["tenant_id", "date"],
      },
      {
        fields: ["status"],
      },
    ],
  },
);

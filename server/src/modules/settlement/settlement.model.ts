import sequelize from "@/configs/db.js";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import {
  SETTLEMENT_PAYMENT_METHOD,
  SETTLEMENT_STATUS,
  SettlementPaymentMethod,
  SettlementStatus,
} from "./settlement.interface.js";

export class Settlement extends Model<
  InferAttributes<
    Settlement,
    {
      omit: "createdAt" | "updatedAt";
    }
  >,
  InferCreationAttributes<Settlement>
> {
  declare id: CreationOptional<number>;

  declare tenantId: number;
  declare mealSessionId: number;
  declare memberId: number;
  declare payerId: number;
  declare payeeId: number;

  declare amount: number;
  declare currency: CreationOptional<string>;
  declare status: CreationOptional<SettlementStatus>;

  declare paymentMethodId: CreationOptional<number | null>;
  declare paymentMethod: SettlementPaymentMethod;
  declare paymentProviderSnapshot: CreationOptional<string | null>;
  declare accountLast4: CreationOptional<string | null>;
  declare transactionReference: CreationOptional<string | null>;
  declare idempotencyKey: CreationOptional<string | null>;

  declare note: CreationOptional<string | null>;
  declare calculationSnapshot: Record<string, unknown>;

  declare balanceBefore: CreationOptional<number | null>;
  declare balanceAfter: CreationOptional<number | null>;

  declare initiatedBy: number;
  declare initiatedAt: CreationOptional<Date | null>;
  declare paidAt: CreationOptional<Date | null>;

  declare cancelledBy: CreationOptional<number | null>;
  declare cancelledAt: CreationOptional<Date | null>;
  declare cancelReason: CreationOptional<string | null>;

  declare disputedBy: CreationOptional<number | null>;
  declare disputedAt: CreationOptional<Date | null>;
  declare disputeReason: CreationOptional<string | null>;

  declare resolvedBy: CreationOptional<number | null>;
  declare resolvedAt: CreationOptional<Date | null>;
  declare resolutionNote: CreationOptional<string | null>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

Settlement.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    tenantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    mealSessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    payerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEqualPayee(this: Settlement, value: number) {
          if (value === this.payeeId) {
            throw new Error("Payer and payee must be different users.");
          }
        },
      },
    },

    payeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.01,
      },
    },

    currency: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      defaultValue: "BDT",
    },

    status: {
      type: DataTypes.ENUM(...SETTLEMENT_STATUS),
      allowNull: false,
      defaultValue: "PENDING",
    },

    paymentMethodId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },

    paymentMethod: {
      type: DataTypes.ENUM(...SETTLEMENT_PAYMENT_METHOD),
      allowNull: false,
    },

    paymentProviderSnapshot: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    accountLast4: {
      type: DataTypes.CHAR(4),
      allowNull: true,
      validate: {
        is: /^\d{4}$/,
      },
    },

    transactionReference: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    idempotencyKey: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    calculationSnapshot: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    balanceBefore: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },

    balanceAfter: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },

    initiatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    initiatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    paidAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    cancelledBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    cancelledAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    cancelReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    disputedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    disputedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    disputeReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    resolvedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    resolvedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    resolutionNote: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Settlement",
    tableName: "settlements",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        name: "settlements_tenant_idempotency_unique",
        unique: true,
        fields: ["tenant_id", "idempotency_key"],
      },
      {
        name: "settlements_transaction_reference_index",
        fields: ["transaction_reference"],
      },
      {
        name: "settlements_tenant_session_member_index",
        fields: ["tenant_id", "meal_session_id", "member_id"],
      },
      {
        name: "settlements_tenant_payer_status_index",
        fields: ["tenant_id", "payer_id", "status"],
      },
      {
        name: "settlements_tenant_payee_status_index",
        fields: ["tenant_id", "payee_id", "status"],
      },
    ],
  },
);
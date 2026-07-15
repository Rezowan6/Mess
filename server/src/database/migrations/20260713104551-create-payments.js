"use strict";
import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.createTable("payments", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      tenant_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "tenants",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      subscription_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "subscriptions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      transaction_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      gateway_payment_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      gateway: {
        type: DataTypes.ENUM("FAKE","BKASH", "NAGAD", "ROCKET", "STRIPE"),
        allowNull: false,
      },

      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },

      status: {
        type: DataTypes.ENUM(
          "PENDING",
          "PROCESSING",
          "SUCCESS",
          "REFUNDED",
          "CANCELLED",
          "FAILED",
        ),
        allowNull: false,
        defaultValue: "PENDING",
      },

      paid_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      gateway_response: {
        type: DataTypes.JSON,
        allowNull: true,
      },

      failure_reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.addIndex("payments", ["tenant_id"], {
      name: "idx_payments_tenant_id",
    });

    await queryInterface.addIndex("payments", ["subscription_id"], {
      name: "idx_payments_subscription_id",
    });

    await queryInterface.addIndex("payments", ["status"], {
      name: "idx_payments_status",
    });

    await queryInterface.addIndex("payments", ["gateway"], {
      name: "idx_payments_gateway",
    });

    await queryInterface.addIndex("payments", ["transaction_id"], {
      unique: true,
      name: "uk_payments_transaction_id",
    });

    await queryInterface.addIndex("payments", ["gateway_payment_id"], {
      unique: true,
      name: "uk_payments_gateway_payment_id",
    });

    await queryInterface.addIndex("payments", ["tenant_id", "status"], {
      name: "idx_payments_tenant_status",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("payments");
  },
};

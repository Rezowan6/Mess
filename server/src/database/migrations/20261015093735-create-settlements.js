"use strict";

import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */

export default {
  async up(queryInterface) {
    await queryInterface.createTable("settlements", {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      tenant_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "tenants", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      meal_session_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "meal_sessions", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      member_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      payer_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      payee_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      currency: {
        type: DataTypes.CHAR(3),
        allowNull: false,
        defaultValue: "BDT",
      },

      status: {
        type: DataTypes.ENUM(
          "PENDING",
          "PAID",
          "AWAITING_CONFIRMATION",
          "COMPLETED",
          "CANCELLED",
          "DISPUTED",
          "EXPIRED",
        ),
        allowNull: false,
        defaultValue: "PENDING",
      },

      payment_method_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "payment_methods", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      payment_method: {
        type: DataTypes.ENUM(
          "CASH",
          "BKASH",
          "NAGAD",
          "ROCKET",
          "BANK",
          "OTHER",
        ),
        allowNull: false,
      },

      payment_provider_snapshot: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      account_last4: {
        type: DataTypes.CHAR(4),
        allowNull: true,
      },

      transaction_reference: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },

      idempotency_key: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      calculation_snapshot: {
        type: DataTypes.JSON,
        allowNull: false,
      },

      balance_before: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },

      balance_after: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },

      initiated_by: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      initiated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      paid_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      cancelled_by: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      cancelled_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      cancel_reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      disputed_by: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      disputed_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      dispute_reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      resolved_by: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      resolved_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      resolution_note: {
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

    await queryInterface.addConstraint("settlements", {
      fields: ["amount"],
      type: "check",
      name: "settlements_amount_positive_check",
      where: {
        amount: {
          [queryInterface.sequelize.Sequelize.Op.gt]: 0,
        },
      },
    });

    await queryInterface.addIndex(
      "settlements",
      ["tenant_id", "idempotency_key"],
      {
        unique: true,
        name: "settlements_tenant_idempotency_unique",
      },
    );

    await queryInterface.addIndex("settlements", ["transaction_reference"], {
      name: "settlements_transaction_reference_index",
    });

    await queryInterface.addIndex(
      "settlements",
      ["tenant_id", "meal_session_id", "member_id"],
      {
        name: "settlements_tenant_session_member_index",
      },
    );

    await queryInterface.addIndex(
      "settlements",
      ["tenant_id", "payer_id", "status"],
      {
        name: "settlements_tenant_payer_status_index",
      },
    );

    await queryInterface.addIndex(
      "settlements",
      ["tenant_id", "payee_id", "status"],
      {
        name: "settlements_tenant_payee_status_index",
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("settlements");
  },
};

"use strict";

import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.createTable("settlement_confirmations", {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
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
      settlement_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "settlements",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      party_role: {
        type: DataTypes.ENUM("PAYER", "PAYEE"),
        allowNull: false,
      },
      action: {
        type: DataTypes.ENUM(
          "MARKED_PAID",
          "CONFIRMED_RECEIVED",
          "REJECTED",
          "DISPUTED",
        ),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("PENDING", "CONFIRMED", "REJECTED"),
        allowNull: false,
        defaultValue: "PENDING",
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ip_address: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      user_agent: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      confirmed_at: {
        type: DataTypes.DATE,
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

    await queryInterface.addIndex(
      "settlement_confirmations",
      ["settlement_id", "user_id", "action"],
      {
        name: "uq_settlement_confirmation_action",
        unique: true,
      },
    );

    await queryInterface.addIndex(
      "settlement_confirmations",
      ["tenant_id", "settlement_id"],
      {
        name: "idx_settlement_confirmations_tenant_settlement",
      },
    );

    await queryInterface.addIndex(
      "settlement_confirmations",
      ["tenant_id", "user_id"],
      {
        name: "idx_settlement_confirmations_tenant_user",
      },
    );

    await queryInterface.sequelize.query(`
      ALTER TABLE settlement_confirmations
      ADD CONSTRAINT chk_settlement_confirmation_party_action
      CHECK (
        (party_role = 'PAYER' AND action <> 'CONFIRMED_RECEIVED')
        OR
        (party_role = 'PAYEE' AND action <> 'MARKED_PAID')
      )
    `);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("settlement_confirmations");
  },
};
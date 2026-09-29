"use strict";

import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.createTable("rice_purchases", {
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

      meal_session_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "meal_sessions",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      created_by: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      quantity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      purchase_type: {
        type: DataTypes.ENUM("PAID", "CREDIT"),
        allowNull: false,
      },

      payment_status: {
        type: DataTypes.ENUM("PAID", "DUE", "PARTIAL", "SETTLED"),
        allowNull: false,
      },

      supplier_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      supplier_phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      purchase_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      due_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      note: {
        type: DataTypes.STRING,
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

      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addIndex(
      "rice_purchases",
      ["tenant_id", "meal_session_id"],
      {
        name: "rice_purchases_tenant_id_meal_session_id_index",
      },
    );

    await queryInterface.addIndex("rice_purchases", ["tenant_id"], {
      name: "rice_purchases_tenant_id_index",
    });

    await queryInterface.addIndex("rice_purchases", ["meal_session_id"], {
      name: "rice_purchases_meal_session_id_index",
    });

    await queryInterface.addIndex("rice_purchases", ["created_by"], {
      name: "rice_purchases_created_by_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("rice_purchases");
  },
};

"use strict";

import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.createTable("rice_payments", {
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

      rice_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "rice_purchases",
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

      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      payment_method: {
        type: DataTypes.ENUM("CASH", "BKASH", "BANK", "OTHER"),
        allowNull: false,
      },

      payment_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
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
      "rice_payments",
      ["tenant_id", "meal_session_id"],
      {
        name: "rice_payments_tenant_id_meal_session_id_index",
      },
    );

    await queryInterface.addIndex("rice_payments", ["tenant_id"], {
      name: "rice_payments_tenant_id_index",
    });

    await queryInterface.addIndex("rice_payments", ["meal_session_id"], {
      name: "rice_payments_meal_session_id_index",
    });

    await queryInterface.addIndex("rice_payments", ["rice_id"], {
      name: "rice_payments_rice_id_index",
    });

    await queryInterface.addIndex("rice_payments", ["created_by"], {
      name: "rice_payments_created_by_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("rice_payments");
  },
};

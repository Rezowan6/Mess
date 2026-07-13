"use strict";

import { DataTypes } from "sequelize";


/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.createTable("subscriptions", {
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

      plan_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "plans",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },

      status: {
        type: DataTypes.ENUM("FREE","ACTIVE","PENDING","EXPIRED","CANCELED"),
        allowNull: false,
        defaultValue: "PENDING",
      },

      is_free_trial: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      end_date: {
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

    await queryInterface.addIndex("subscriptions", ["tenant_id"], {
      name: "idx_mss_tenant_id",
    });

    await queryInterface.addIndex("subscriptions", ["plan_id"], {
      name: "idx_mss_plan_id",
    });

    await queryInterface.addIndex("subscriptions", ["status"], {
      name: "idx_mss_status",
    });

    await queryInterface.addIndex("subscriptions", ["is_free_trial"], {
      name: "idx_mss_is_free_trial",
    });

    await queryInterface.addIndex("subscriptions", ["tenant_id", "status"], {
      name: "idx_mss_tenant_status",
    });

    await queryInterface.addIndex(
      "subscriptions",
      ["tenant_id", "is_free_trial"],
      {
        name: "idx_mss_tenant_free_trial",
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("subscriptions");
  },
};

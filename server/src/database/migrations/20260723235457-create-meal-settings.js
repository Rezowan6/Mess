"use strict";
import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.createTable("meal_settings", {
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

      default_breakfast_meal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      default_lunch_meal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      default_dinner_meal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      max_meal_per_request: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
      },

      breakfast_cutoff_minute: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1320, // 10:00 PM
      },

      breakfast_previous_day: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      lunch_cutoff_minute: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 600, // 10:00 AM
      },

      dinner_cutoff_minute: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 960, // 4:00 PM
      },

      allow_guest_meal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      auto_approve_meal_request: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      timezone: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Asia/Dhaka",
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

    await queryInterface.addIndex("meal_settings", ["tenant_id"], {
      unique: true,
      name: "meal_settings_tenant_id_unique",
    });

    await queryInterface.addIndex(
      "meal_settings",
      ["tenant_id", "breakfast_cutoff_minute"],
      {
        name: "meal_settings_tenant_breakfast_cutoff_index",
      },
    );

    await queryInterface.addIndex(
      "meal_settings",
      ["tenant_id", "lunch_cutoff_minute"],
      {
        name: "meal_settings_tenant_lunch_cutoff_index",
      },
    );

    await queryInterface.addIndex(
      "meal_settings",
      ["tenant_id", "dinner_cutoff_minute"],
      {
        name: "meal_settings_tenant_dinner_cutoff_index",
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("meal_settings");
  },
};

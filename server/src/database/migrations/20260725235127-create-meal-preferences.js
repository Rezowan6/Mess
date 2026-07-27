"use strict";
import { DataTypes } from "sequelize";

// npx sequelize-cli db:migrate
// npx sequelize-cli migration:generate --name create-meal-preferences
// npx sequelize-cli db:migrate --to <migration-file-name>.js

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.createTable("meal_preferences", {
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
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
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
      breakfast: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 1,
      },
      lunch: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 1,
      },
      dinner: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 1,
      },

      guest_meal: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
      "meal_preferences",
      ["tenant_id", "meal_session_id", "user_id",],
      {
        unique: true,
        name: "meal_preferences_tenant_id_meal_session_id_user_id_unique",
      },
    );

    await queryInterface.addIndex("meal_preferences", ["tenant_id"], {
      name: "meal_preferences_tenant_id_index",
    });
    await queryInterface.addIndex("meal_preferences", ["user_id"], {
      name: "meal_preferences_user_id_index",
    });
    await queryInterface.addIndex("meal_preferences", ["is_active",], {
      name: "meal_preferences_is_active_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("meal_preferences");
  },
};

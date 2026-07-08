"use strict";
import { DataTypes } from "sequelize";


// npx sequelize-cli db:migrate
// npx sequelize-cli migration:generate --name create-meal-sessions
// npx sequelize-cli db:migrate --to <migration-file-name>.js

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface) {
    await queryInterface.createTable("meal_entries", {
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
      meal_request_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "meal_requests",
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
      "meal_entries",
      ["tenant_id", "meal_session_id", "user_id", "date"],
      {
        unique: true,
        name: "tenant_id_meal_session_id_user_id_date_unique",
      },
    );

    await queryInterface.addIndex("meal_entries", ["tenant_id"], {
      name: "meal_entry_tenant_id_index",
    });
    await queryInterface.addIndex("meal_entries", ["meal_session_id"], {
      name: "meal_entry_meal_session_id_index",
    });
    await queryInterface.addIndex("meal_entries", ["meal_request_id"], {
      name: "meal_entry_meal_request_id_index",
    });
    await queryInterface.addIndex("meal_entries", ["user_id"], {
      name: "meal_entry_user_id_index",
    });
    await queryInterface.addIndex("meal_entries", ["tenant_id","date"], {
      name: "meal_entry_tenant_id_date_index",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("meal_entries");
  },
};
